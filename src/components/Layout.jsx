import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatWidget from './ChatWidget';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { markAttendance } = useData();

  // --- AUTOMATIC ATTENDANCE ---
  useEffect(() => {
    if (user) {
      markAttendance(user.id);
    }
  }, [user]); // Runs when user loads

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="app-layout">
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>☰</button>

      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
         <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
            <button 
              className="secondary mobile-only" 
              style={{border: 'none', padding: '0.5rem', display: isMobileMenuOpen ? 'block' : 'none'}} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
         </div>
         <Sidebar closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      </div>
      
      <main className={`content ${isMobileMenuOpen ? 'sidebar-open' : ''}`}>
        <Outlet />
      </main>

      <ChatWidget />
    </div>
  );
}

export default Layout;