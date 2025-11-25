import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

function AdminPage() {
  const { user } = useAuth();
  const { users, leaves, approveLeave, getUserById, addAnnouncement, addUserDocument, updateUserProfile } = useData();

  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  
  // State for Document Adding
  const [docInputs, setDocInputs] = useState({}); // { userId: { name: '', url: '' } }

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(annTitle, annContent, user.id);
    setAnnTitle(''); setAnnContent('');
  };

  const handleDocChange = (userId, field, value) => {
    setDocInputs(prev => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value }
    }));
  };

  const handleAddDoc = (userId) => {
    const input = docInputs[userId];
    if (input && input.name && input.url) {
      addUserDocument(userId, input.name, input.url);
      setDocInputs(prev => ({ ...prev, [userId]: { name: '', url: '' } }));
      alert('Document added!');
    }
  };

  const pendingLeaves = leaves.filter(l => l.status === 'Pending');

  return (
    <div className="page-container">
      <h1>Admin Panel</h1>
      
      <div className="dashboard-grid">
        <section className="glass-card">
           <h2>Create Announcement</h2>
           <form onSubmit={handleAnnouncementSubmit} className="form-container">
             <input type="text" placeholder="Title" value={annTitle} onChange={e => setAnnTitle(e.target.value)} />
             <textarea placeholder="Content" value={annContent} onChange={e => setAnnContent(e.target.value)} />
             <button type="submit">Post</button>
           </form>
        </section>

        <section className="glass-card">
          <h2>Pending Leaves</h2>
          <div className="data-list">
            {pendingLeaves.length === 0 && <p>No requests.</p>}
            {pendingLeaves.map(l => (
              <div key={l.id} className="data-item">
                <div>
                   <strong>{getUserById(l.userId)?.name}</strong>
                   <div style={{fontSize:'0.9rem'}}>{l.reason} ({l.startDate} to {l.endDate})</div>
                </div>
                <button onClick={() => approveLeave(l.id)} style={{background:'var(--success)', color:'black'}}>Approve</button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* USER MANAGEMENT & DOCUMENTS */}
      <section className="glass-card">
        <h2>User Management</h2>
        <div className="data-list">
          {users.map(u => {
            const inputs = docInputs[u.id] || { name: '', url: '' };
            return (
              <div key={u.id} className="data-item" style={{display:'block'}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
                  <strong>{u.name} ({u.role})</strong>
                  <span>{u.title}</span>
                </div>
                
                {/* Document Adder */}
                <div style={{background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'8px'}}>
                  <p style={{marginBottom:'0.5rem', fontSize:'0.9rem'}}>Link Document for {u.name}</p>
                  <div className="form-row">
                    <input 
                      type="text" placeholder="Doc Name" 
                      value={inputs.name} 
                      onChange={e => handleDocChange(u.id, 'name', e.target.value)} 
                      style={{marginBottom:0}}
                    />
                    <input 
                      type="text" placeholder="URL (Google Drive, etc)" 
                      value={inputs.url} 
                      onChange={e => handleDocChange(u.id, 'url', e.target.value)}
                      style={{marginBottom:0}}
                    />
                    <button onClick={() => handleAddDoc(u.id)} style={{marginBottom:0}}>Add</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AdminPage;