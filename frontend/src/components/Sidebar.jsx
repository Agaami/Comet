import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

function Sidebar({ closeMobileMenu }) {
  const { user, logout, isAdmin } = useAuth();
  const { getNotifications, markNotificationsRead } = useData();
  const navigate = useNavigate();

  const notifications = getNotifications(user.id);
  const unreadCount = notifications.filter(n => !n.read).length;
  const handleLogout = () => { logout(); navigate('/login'); };
  const handleLinkClick = () => { if (closeMobileMenu) closeMobileMenu(); };

  return (
    <>
      <div className="sidebar-header">
        <h1>COMET</h1>
        <div style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop:'0.5rem', paddingLeft:'2px'}}>V5.1 // STABLE</div>
      </div>
      
      <div style={{background:'rgba(255,255,255,0.05)', padding:'0.8rem', borderRadius:'8px', marginBottom:'1.5rem', cursor:'pointer'}} onClick={() => markNotificationsRead(user.id)}>
         <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', fontWeight:'600', color:'var(--text-muted)'}}>
           <span>NOTIFICATIONS</span>
           {unreadCount > 0 && <span style={{color:'var(--primary)'}}>{unreadCount} NEW</span>}
         </div>
         {notifications.slice(0, 2).map(n => (<div key={n.id} style={{fontSize:'0.8rem', marginTop:'0.5rem', borderLeft: n.read ? '2px solid transparent' : '2px solid var(--primary)', paddingLeft:'0.5rem'}}>{n.text}</div>))}
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" end onClick={handleLinkClick}>Home</NavLink> {/* Renamed */}
        <NavLink to="/tasks" onClick={handleLinkClick}>Task</NavLink> {/* Renamed */}
        <NavLink to="/analytics" onClick={handleLinkClick}>Analytics</NavLink>
        <NavLink to="/timesheets" onClick={handleLinkClick}>Time Logs</NavLink>
        <NavLink to="/hr" onClick={handleLinkClick}>HR Portal</NavLink> {/* Renamed */}
        <NavLink to="/payroll" onClick={handleLinkClick}>Payroll</NavLink>
        <NavLink to="/kb" onClick={handleLinkClick}>Internal Policy</NavLink> {/* Renamed */}
        <NavLink to="/recruitment" onClick={handleLinkClick}>Reference</NavLink> {/* Renamed */}
        <NavLink to="/settings" onClick={handleLinkClick}>Settings</NavLink>
      </nav>

      <footer style={{marginTop: '2rem'}}>
        <div className="sidebar-user" style={{marginBottom: '1rem'}}>
          <p style={{color:'var(--text-main)'}}>{user.name}</p>
          <p>{user.role}</p>
        </div>
        <button className="danger" onClick={handleLogout} style={{width: '100%'}}>Disconnect</button>
      </footer>
    </>
  );
}

export default Sidebar;