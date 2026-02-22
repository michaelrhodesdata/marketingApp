import React, { useState } from 'react';
import RecipientSelector from '../components/RecipientSelector.jsx';
import EmailBuilder from '../components/EmailBuilder.jsx';

const styles = {
  page: { padding: '24px', maxWidth: '1400px', margin: '0 auto' },
  header: { marginBottom: '24px' },
  h1: { fontSize: '26px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  sub: { color: '#666', fontSize: '14px' },
  layout: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '24px',
    alignItems: 'start',
  },
};

export default function EmailMarketing() {
  const [recipients, setRecipients] = useState([]);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Email Marketing</h1>
        <p style={styles.sub}>Build and send professional email campaigns to Toyota dealers</p>
      </div>
      <div style={styles.layout}>
        <RecipientSelector onRecipientsChange={setRecipients} />
        <EmailBuilder recipients={recipients} />
      </div>
    </div>
  );
}
