import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TEMPLATES } from './emailTemplates.js';
import { apiFetch } from '../api.js';

const styles = {
  panel: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  title: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a' },
  label: { fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px', display: 'block' },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  templateCard: (active) => ({
    padding: '12px',
    border: `2px solid ${active ? '#EB0A1E' : '#ddd'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.15s',
    background: active ? '#fff5f5' : '#fff',
  }),
  templateName: (active) => ({
    fontSize: '13px',
    fontWeight: active ? '700' : '500',
    color: active ? '#EB0A1E' : '#333',
    marginTop: '4px',
  }),
  templateIcon: { fontSize: '24px' },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
  toolbarRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
  uploadBtn: {
    padding: '8px 14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: '#f9f9f9',
    cursor: 'pointer',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  attachList: { display: 'flex', flexDirection: 'column', gap: '4px' },
  attachItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 10px',
    background: '#f5f5f5',
    borderRadius: '4px',
    fontSize: '12px',
    color: '#555',
  },
  removeBtn: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    fontSize: '16px',
    lineHeight: 1,
  },
  tabs: { display: 'flex', gap: '0', borderBottom: '2px solid #eee' },
  tab: (active) => ({
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: active ? '600' : '400',
    color: active ? '#EB0A1E' : '#666',
    marginBottom: '-2px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottom: active ? '2px solid #EB0A1E' : '2px solid transparent',
  }),
  previewFrame: {
    width: '100%',
    height: '400px',
    border: '1px solid #eee',
    borderRadius: '6px',
  },
  sendBtn: {
    padding: '12px 32px',
    background: '#EB0A1E',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  testRow: { display: 'flex', gap: '8px', alignItems: 'center' },
  testInput: {
    flex: 1,
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
  testBtn: {
    padding: '10px 20px',
    background: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  statusMsg: (type) => ({
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    background: type === 'success' ? '#f0fdf4' : type === 'error' ? '#fef2f2' : '#f8f9fa',
    color: type === 'success' ? '#166534' : type === 'error' ? '#991b1b' : '#374151',
    border: `1px solid ${type === 'success' ? '#bbf7d0' : type === 'error' ? '#fecaca' : '#e5e7eb'}`,
  }),
};

const TEMPLATE_LIST = [
  { key: 'professional', name: 'Professional', icon: '🏢' },
  { key: 'newsletter', name: 'Newsletter', icon: '📰' },
  { key: 'announcement', name: 'Announcement', icon: '📢' },
  { key: 'simple', name: 'Simple', icon: '✉️' },
];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

export default function EmailBuilder({ recipients }) {
  const [activeTemplate, setActiveTemplate] = useState('professional');
  const [subject, setSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [activeTab, setActiveTab] = useState('editor');
  const [status, setStatus] = useState(null); // { type: 'success'|'error'|'info', msg }
  const [sending, setSending] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const quillRef = useRef(null);
  const imageInputRef = useRef(null);
  const attachInputRef = useRef(null);

  // Initialize editor with template content when template changes
  useEffect(() => {
    const tpl = TEMPLATES[activeTemplate];
    if (tpl && !bodyHtml) {
      setBodyHtml(tpl.defaultBody || '');
    }
  }, []);

  const selectTemplate = (key) => {
    setActiveTemplate(key);
    const tpl = TEMPLATES[key];
    if (tpl) setBodyHtml(tpl.defaultBody || '');
  };

  const getFinalHtml = () => {
    const tpl = TEMPLATES[activeTemplate];
    if (!tpl) return bodyHtml;
    return tpl.wrap(bodyHtml);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await apiFetch('/api/email/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url && quillRef.current) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', data.url);
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Image upload failed: ' + err.message });
    }
    e.target.value = '';
  };

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
    e.target.value = '';
  };

  const removeAttachment = (idx) => {
    setAttachments(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSend = async () => {
    if (!subject.trim()) { setStatus({ type: 'error', msg: 'Please enter a subject line.' }); return; }
    if (!bodyHtml.trim()) { setStatus({ type: 'error', msg: 'Please write an email body.' }); return; }
    if (recipients.length === 0) { setStatus({ type: 'error', msg: 'No recipients selected.' }); return; }

    setSending(true);
    setStatus({ type: 'info', msg: `Sending to ${recipients.length} recipients...` });

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('html', getFinalHtml());
    formData.append('recipients', JSON.stringify(recipients));
    attachments.forEach(f => formData.append('attachments', f));

    try {
      const res = await apiFetch('/api/email/send', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: `Sent: ${data.sent} ✓  Failed: ${data.failed}${data.failed > 0 ? ' (check server logs)' : ''}` });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Send failed' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error: ' + err.message });
    } finally {
      setSending(false);
    }
  };

  const handleTestSend = async () => {
    if (!testEmail.trim()) { setStatus({ type: 'error', msg: 'Enter a test email address.' }); return; }
    if (!subject.trim()) { setStatus({ type: 'error', msg: 'Enter a subject line.' }); return; }
    setSending(true);
    try {
      const res = await apiFetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: testEmail, subject, html: getFinalHtml() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: `Test email sent to ${testEmail}` });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Failed to send test' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error: ' + err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={styles.panel}>
      <div style={styles.title}>Email Builder</div>

      {/* Template Selector */}
      <div>
        <label style={styles.label}>Template</label>
        <div style={styles.templateGrid}>
          {TEMPLATE_LIST.map(t => (
            <div key={t.key} style={styles.templateCard(activeTemplate === t.key)} onClick={() => selectTemplate(t.key)}>
              <div style={styles.templateIcon}>{t.icon}</div>
              <div style={styles.templateName(activeTemplate === t.key)}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label style={styles.label}>Subject Line</label>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter email subject..."
          value={subject}
          onChange={e => setSubject(e.target.value)}
        />
      </div>

      {/* Editor / Preview tabs */}
      <div>
        <div style={styles.tabs}>
          <button style={styles.tab(activeTab === 'editor')} onClick={() => setActiveTab('editor')}>Editor</button>
          <button style={styles.tab(activeTab === 'preview')} onClick={() => setActiveTab('preview')}>Preview</button>
        </div>

        {activeTab === 'editor' ? (
          <div>
            <div style={{ marginTop: '8px' }}>
              <div style={styles.toolbarRow}>
                <button style={styles.uploadBtn} onClick={() => imageInputRef.current?.click()}>
                  🖼 Insert Image
                </button>
                <button style={styles.uploadBtn} onClick={() => attachInputRef.current?.click()}>
                  📎 Add Attachment
                </button>
                <input ref={imageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                <input ref={attachInputRef} type="file" multiple style={{ display: 'none' }} onChange={handleAttachment} />
              </div>
            </div>
            <style>{`.ql-editor { min-height: 380px; font-size: 14px; line-height: 1.7; } .ql-toolbar { flex-wrap: wrap; }`}</style>
            <div style={{ marginTop: '8px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden' }}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={bodyHtml}
                onChange={setBodyHtml}
                modules={quillModules}
              />
            </div>
          </div>
        ) : (
          <iframe
            style={styles.previewFrame}
            srcDoc={getFinalHtml()}
            title="Email Preview"
            sandbox="allow-same-origin"
          />
        )}
      </div>

      {/* Attachments */}
      {attachments.length > 0 && (
        <div>
          <label style={styles.label}>Attachments ({attachments.length})</label>
          <div style={styles.attachList}>
            {attachments.map((f, i) => (
              <div key={i} style={styles.attachItem}>
                <span>📎</span>
                <span>{f.name}</span>
                <span style={{ color: '#aaa' }}>({(f.size / 1024).toFixed(0)} KB)</span>
                <button style={styles.removeBtn} onClick={() => removeAttachment(i)}>×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      {status && <div style={styles.statusMsg(status.type)}>{status.msg}</div>}

      {/* Test send */}
      <div>
        <label style={styles.label}>Test Email</label>
        <div style={styles.testRow}>
          <input
            style={styles.testInput}
            type="email"
            placeholder="your@email.com"
            value={testEmail}
            onChange={e => setTestEmail(e.target.value)}
          />
          <button style={styles.testBtn} onClick={handleTestSend} disabled={sending}>
            Send Test
          </button>
        </div>
      </div>

      {/* Send campaign */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
        <button style={{ ...styles.sendBtn, opacity: sending ? 0.7 : 1 }} onClick={handleSend} disabled={sending}>
          {sending ? 'Sending...' : `Send Campaign (${recipients.length} recipients)`}
        </button>
        <span style={{ fontSize: '13px', color: '#888' }}>
          {recipients.length === 0 ? 'No recipients selected' : `${recipients.length} dealer${recipients.length !== 1 ? 's' : ''} will receive this email`}
        </span>
      </div>
    </div>
  );
}
