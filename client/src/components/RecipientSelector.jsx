import React, { useState, useEffect } from 'react';
import { apiFetch } from '../api.js';

const styles = {
  panel: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  title: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a' },
  toggleRow: { display: 'flex', gap: '8px' },
  toggleBtn: (active) => ({
    flex: 1,
    padding: '8px',
    border: `2px solid ${active ? '#EB0A1E' : '#ddd'}`,
    borderRadius: '6px',
    background: active ? '#fff5f5' : '#fff',
    color: active ? '#EB0A1E' : '#555',
    fontWeight: active ? '600' : '400',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.15s',
  }),
  label: { fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' },
  select: {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    background: '#fff',
    cursor: 'pointer',
  },
  countBadge: {
    display: 'inline-block',
    background: '#EB0A1E',
    color: '#fff',
    borderRadius: '12px',
    padding: '2px 10px',
    fontSize: '13px',
    fontWeight: '700',
  },
  countRow: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555' },
  listWrap: {
    flex: 1,
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '6px',
    maxHeight: '300px',
  },
  listItem: {
    padding: '8px 12px',
    borderBottom: '1px solid #f5f5f5',
    fontSize: '12px',
    color: '#333',
  },
  listItemName: { fontWeight: '600', marginBottom: '2px' },
  listItemEmail: { color: '#666' },
  emptyList: { padding: '20px', textAlign: 'center', color: '#aaa', fontSize: '13px' },
  stateSelectWrap: { display: 'flex', flexDirection: 'column' },
  multiSelect: {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '13px',
    padding: '4px',
    minHeight: '120px',
  },
  hint: { fontSize: '11px', color: '#999', marginTop: '4px' },
};

export default function RecipientSelector({ onRecipientsChange }) {
  const [mode, setMode] = useState('all'); // 'all' or 'filter'
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch('/api/dealers/states')
      .then(r => r.json())
      .then(setStates)
      .catch(console.error);
  }, []);

  useEffect(() => {
    loadRecipients();
  }, [mode, selectedStates]);

  const loadRecipients = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (mode === 'filter' && selectedStates.length > 0) {
      params.set('state', selectedStates.join(','));
    } else if (mode === 'filter' && selectedStates.length === 0) {
      setRecipients([]);
      setLoading(false);
      onRecipientsChange([]);
      return;
    }
    apiFetch(`/api/email/recipients?${params}`)
      .then(r => r.json())
      .then(data => {
        setRecipients(data.recipients);
        onRecipientsChange(data.recipients);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleStateChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(o => o.value);
    setSelectedStates(selected);
  };

  return (
    <div style={styles.panel}>
      <div style={styles.title}>Recipients</div>

      <div style={styles.toggleRow}>
        <button style={styles.toggleBtn(mode === 'all')} onClick={() => setMode('all')}>
          All Dealers
        </button>
        <button style={styles.toggleBtn(mode === 'filter')} onClick={() => setMode('filter')}>
          Filter by State
        </button>
      </div>

      {mode === 'filter' && (
        <div style={styles.stateSelectWrap}>
          <div style={styles.label}>Select States</div>
          <select
            multiple
            style={styles.multiSelect}
            value={selectedStates}
            onChange={handleStateChange}
          >
            {states.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span style={styles.hint}>Hold Ctrl/Cmd to select multiple states</span>
        </div>
      )}

      <div style={styles.countRow}>
        <span>Recipients with email:</span>
        <span style={styles.countBadge}>{loading ? '...' : recipients.length}</span>
      </div>

      <div>
        <div style={styles.label}>Preview</div>
        <div style={styles.listWrap}>
          {recipients.length === 0 ? (
            <div style={styles.emptyList}>
              {mode === 'filter' && selectedStates.length === 0
                ? 'Select states to see recipients'
                : 'No recipients with email addresses found'}
            </div>
          ) : (
            recipients.slice(0, 100).map((r, i) => (
              <div key={i} style={styles.listItem}>
                <div style={styles.listItemName}>{r.name} ({r.state})</div>
                <div style={styles.listItemEmail}>{r.email}</div>
              </div>
            ))
          )}
          {recipients.length > 100 && (
            <div style={{ ...styles.listItem, color: '#999', fontStyle: 'italic' }}>
              ...and {recipients.length - 100} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
