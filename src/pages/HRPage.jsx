import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

function HRPage() {
  const { user } = useAuth();
  const { users, getLeavesForUser, addLeaveRequest } = useData();
  const myLeaves = getLeavesForUser(user.id);
  
  // Updated form state
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason || !startDate || !endDate) return;
    addLeaveRequest({ userId: user.id, reason, startDate, endDate });
    setReason(''); setStartDate(''); setEndDate('');
  };

  return (
    <div className="page-container">
      <h1>HR Portal</h1>
      
      <div className="dashboard-grid">
        {/* LEAVE REQUEST */}
        <section className="glass-card">
          <h2>Request Leave</h2>
          <form onSubmit={handleSubmit} className="form-container">
            <input type="text" placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} required />
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>

        {/* MY DOCUMENTS (NEW) */}
        <section className="glass-card">
          <h2>My Documents</h2>
          <div className="doc-list">
            {(!user.documents || user.documents.length === 0) && <p>No documents uploaded by Admin.</p>}
            {user.documents && user.documents.map((doc, idx) => (
              <div key={idx} className="doc-item">
                <span>📄 {doc.name}</span>
                <a href={doc.url} target="_blank" rel="noopener noreferrer">Open Link</a>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      {/* LEAVE HISTORY */}
      <section className="glass-card">
        <h2>My Leave History</h2>
        <div className="data-list">
          {myLeaves.map(leave => (
            <div key={leave.id} className="data-item">
              <div className="data-item-info">
                <strong>{leave.reason}</strong>
                <span>{leave.startDate} to {leave.endDate}</span>
              </div>
              <span className={`status status-${leave.status}`}>{leave.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM DIRECTORY */}
      <section className="glass-card">
        <h2>Team Directory</h2>
        <div className="team-grid">
          {users.map(u => (
            <div key={u.id} className="team-member-card">
              <h3>{u.name}</h3>
              <p>{u.title}</p>
              <p>{u.email}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HRPage;