import React, { useState, useEffect, useCallback } from 'react';

const styles = {
  page: { padding: '24px', maxWidth: '1400px', margin: '0 auto' },
  header: { marginBottom: '24px' },
  h1: { fontSize: '26px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' },
  sub: { color: '#666', fontSize: '14px' },
  searchBar: {
    display: 'grid',
    gridTemplateColumns: '1fr auto auto auto auto',
    gap: '12px',
    background: '#fff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    marginBottom: '16px',
    alignItems: 'end',
  },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    background: '#fff',
    outline: 'none',
    cursor: 'pointer',
  },
  searchBtn: {
    padding: '10px 24px',
    background: '#EB0A1E',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  clearBtn: {
    padding: '10px 16px',
    background: '#f5f5f5',
    color: '#555',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  resultInfo: { fontSize: '14px', color: '#555', marginBottom: '12px' },
  count: { fontWeight: '700', color: '#EB0A1E' },
  tableWrap: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    overflow: 'auto',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: {
    padding: '12px 16px',
    background: '#f8f8f8',
    borderBottom: '2px solid #eee',
    textAlign: 'left',
    fontWeight: '600',
    color: '#333',
    whiteSpace: 'nowrap',
  },
  td: { padding: '10px 16px', borderBottom: '1px solid #f0f0f0', color: '#333' },
  trEven: { background: '#fafafa' },
  trOdd: { background: '#fff' },
  link: { color: '#EB0A1E', textDecoration: 'none', fontSize: '12px' },
  email: { color: '#333', fontSize: '12px' },
  noResults: { padding: '40px', textAlign: 'center', color: '#888' },
  loading: { padding: '40px', textAlign: 'center', color: '#888' },
};

export default function DealerSearch() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [dealers, setDealers] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    fetch('/api/dealers/states')
      .then(r => r.json())
      .then(setStates)
      .catch(console.error);
    // Load all dealers initially
    fetchDealers('', '', '', '');
  }, []);

  useEffect(() => {
    if (state) {
      fetch(`/api/dealers/cities?state=${state}`)
        .then(r => r.json())
        .then(setCities)
        .catch(console.error);
    } else {
      setCities([]);
      setCity('');
    }
  }, [state]);

  const fetchDealers = useCallback((q, st, ct, zp) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (st) params.set('state', st);
    if (ct) params.set('city', ct);
    if (zp) params.set('zip', zp);
    fetch(`/api/dealers?${params}`)
      .then(r => r.json())
      .then(data => {
        setDealers(data.dealers);
        setCount(data.count);
        setSearched(true);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDealers(query, state, city, zip);
  };

  const handleClear = () => {
    setQuery(''); setState(''); setCity(''); setZip('');
    fetchDealers('', '', '', '');
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Toyota Dealer Search</h1>
        <p style={styles.sub}>Search across all Toyota dealerships nationwide</p>
      </div>

      <form style={styles.searchBar} onSubmit={handleSearch}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Search</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Dealer name or code..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>State</label>
          <select style={styles.select} value={state} onChange={e => setState(e.target.value)}>
            <option value="">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>City</label>
          <select style={styles.select} value={city} onChange={e => setCity(e.target.value)} disabled={!state}>
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>ZIP</label>
          <input
            style={{ ...styles.input, width: '100px' }}
            type="text"
            placeholder="78701"
            value={zip}
            onChange={e => setZip(e.target.value)}
            maxLength={5}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" style={styles.searchBtn}>Search</button>
          <button type="button" style={styles.clearBtn} onClick={handleClear}>Clear</button>
        </div>
      </form>

      {searched && (
        <p style={styles.resultInfo}>
          Showing <span style={styles.count}>{count.toLocaleString()}</span> dealer{count !== 1 ? 's' : ''}
        </p>
      )}

      <div style={styles.tableWrap}>
        {loading ? (
          <div style={styles.loading}>Loading...</div>
        ) : dealers.length === 0 ? (
          <div style={styles.noResults}>No dealers found. Try adjusting your search.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>City</th>
                <th style={styles.th}>State</th>
                <th style={styles.th}>ZIP</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Website</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((d, i) => (
                <tr key={d.dealer_code || i} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}>{d.dealer_code}</td>
                  <td style={{ ...styles.td, fontWeight: '600' }}>{d.name}</td>
                  <td style={styles.td}>{d.address}</td>
                  <td style={styles.td}>{d.city}</td>
                  <td style={styles.td}>{d.state}</td>
                  <td style={styles.td}>{d.zip}</td>
                  <td style={styles.td}>{d.phone}</td>
                  <td style={styles.td}>
                    {d.email ? (
                      <a href={`mailto:${d.email}`} style={styles.email}>{d.email}</a>
                    ) : '—'}
                  </td>
                  <td style={styles.td}>
                    {d.website ? (
                      <a href={d.website} target="_blank" rel="noreferrer" style={styles.link}>Visit ↗</a>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
