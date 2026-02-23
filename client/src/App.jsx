import React from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import DealerSearch from './pages/DealerSearch.jsx';
import EmailMarketing from './pages/EmailMarketing.jsx';
import Login from './pages/Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

const BLUE = '#1a56db';

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  background: BLUE,
  padding: '0 24px',
  height: '56px',
};

const logoStyle = {
  color: '#fff',
  fontWeight: '700',
  fontSize: '18px',
  marginRight: '32px',
  textDecoration: 'none',
};

const linkStyle = {
  color: 'rgba(255,255,255,0.8)',
  textDecoration: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  fontSize: '14px',
};

const activeLinkStyle = {
  ...linkStyle,
  color: '#fff',
  background: 'rgba(255,255,255,0.18)',
};

const logoutStyle = {
  marginLeft: 'auto',
  padding: '7px 16px',
  background: 'rgba(255,255,255,0.15)',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)',
  borderRadius: '5px',
  fontSize: '13px',
  cursor: 'pointer',
};

function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };
  return (
    <nav style={navStyle}>
      <a href="https://www.revusup.com" target="_blank" rel="noreferrer" style={logoStyle}>
        Revusup.com
      </a>
      <NavLink to="/dealers" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
        Dealer Search
      </NavLink>
      <NavLink to="/email" style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}>
        Email Marketing
      </NavLink>
      <button style={logoutStyle} onClick={handleLogout}>Sign Out</button>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Nav />
              <Routes>
                <Route path="/" element={<Navigate to="/dealers" replace />} />
                <Route path="/dealers" element={<DealerSearch />} />
                <Route path="/email" element={<EmailMarketing />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
