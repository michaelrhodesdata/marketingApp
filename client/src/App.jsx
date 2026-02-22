import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import DealerSearch from './pages/DealerSearch.jsx';
import EmailMarketing from './pages/EmailMarketing.jsx';

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0',
  background: '#EB0A1E',
  padding: '0 24px',
  height: '56px',
};

const logoStyle = {
  color: '#fff',
  fontWeight: '700',
  fontSize: '20px',
  letterSpacing: '1px',
  marginRight: '32px',
  textDecoration: 'none',
};

const linkStyle = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  fontSize: '15px',
  transition: 'background 0.15s',
};

const activeLinkStyle = {
  ...linkStyle,
  color: '#fff',
  background: 'rgba(255,255,255,0.2)',
};

export default function App() {
  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <span style={logoStyle}>TOYOTA</span>
        <NavLink
          to="/dealers"
          style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
        >
          Dealer Search
        </NavLink>
        <NavLink
          to="/email"
          style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
        >
          Email Marketing
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/dealers" replace />} />
        <Route path="/dealers" element={<DealerSearch />} />
        <Route path="/email" element={<EmailMarketing />} />
      </Routes>
    </BrowserRouter>
  );
}
