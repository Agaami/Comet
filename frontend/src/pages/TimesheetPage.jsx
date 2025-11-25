import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function TimesheetPage() {
  const { user } = useAuth();
  const { logTime, getTimesheetsForUser } = useData();
  const myTimesheets = getTimesheetsForUser(user.id);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hours || !desc) return;
    logTime({ userId: user.id, date, hours: parseFloat(hours), description: desc });
    setHours('');
    setDesc('');
  };

  // Calculate total hours logged
  const totalHours = myTimesheets.reduce((acc, curr) => acc + curr.hours, 0);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Time Tracking</h1>

      <div className="dashboard-grid">
        {/* Entry Form */}
        <section className="glass-card" style={{ gridColumn: 'span 2' }}>
          <h2>Log Daily Activity</h2>
          <form onSubmit={handleSubmit} className="form-container" style={{maxWidth: '100%'}}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{display:'block', marginBottom:'0.5rem', color:'var(--text-muted)'}}>Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required style={{width:'100%'}} />
              </div>
              <div>
                <label style={{display:'block', marginBottom:'0.5rem', color:'var(--text-muted)'}}>Hours Worked</label>
                <input type="number" step="0.5" placeholder="e.g. 8.0" value={hours} onChange={e => setHours(e.target.value)} required style={{width:'100%'}} />
              </div>
            </div>
            <div>
              <label style={{display:'block', marginBottom:'0.5rem', color:'var(--text-muted)'}}>Description</label>
              <textarea 
                placeholder="What did you work on today?" 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                required 
                style={{width:'100%', minHeight:'80px'}}
              />
            </div>
            <button type="submit" style={{width:'auto'}}>Log Time</button>
          </form>
        </section>

        {/* Summary Stat */}
        <div className="stat-card glass-card">
          <h3>Total Hours Logged</h3>
          <span className="stat-number">{totalHours}</span>
          <p style={{color:'var(--text-muted)'}}>All time</p>
        </div>
      </div>

      {/* History Table */}
      <section className="glass-card">
        <h2>History</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Hours</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {myTimesheets.sort((a,b) => new Date(b.date) - new Date(a.date)).map(entry => (
                <tr key={entry.id}>
                  <td style={{fontFamily:'monospace'}}>{entry.date}</td>
                  <td>{entry.hours}</td>
                  <td>{entry.description}</td>
                </tr>
              ))}
              {myTimesheets.length === 0 && <tr><td colSpan="3" style={{textAlign:'center', padding:'2rem', color:'var(--text-muted)'}}>No entries found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}

export default TimesheetPage;