import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';

function DashboardPage() {
  const { user } = useAuth();
  const { tasks, leaves, announcements, users, submitPulse, pulseData, onboardingSteps, toggleOnboardingStep } = useData();

  const myTasks = tasks.filter(t => t.assignedToId === user.id);
  const pendingTasks = myTasks.filter(t => t.status !== 'Done').length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const usersOnLeave = users.filter(u => {
    const userLeaves = leaves.filter(l => l.userId === u.id && l.status === 'Approved');
    return userLeaves.some(l => todayStr >= l.startDate && todayStr <= l.endDate);
  });

  const myPulseToday = pulseData.find(p => p.userId === user.id && p.date === todayStr);
  const [mood, setMood] = useState(myPulseToday?.mood || '');

  const handlePulse = (selectedMood) => {
    setMood(selectedMood);
    submitPulse(user.id, selectedMood);
  };
  
  const completedSteps = onboardingSteps.filter(s => s.done).length;
  const progress = Math.round((completedSteps / onboardingSteps.length) * 100);
  const showOnboarding = !user.onboardingComplete;

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
        <div>
          <h1 style={{marginBottom:'0.5rem'}}>Home</h1> {/* Renamed */}
          <p style={{color:'var(--text-muted)'}}>Welcome back, {user.name}</p>
        </div>
        <span style={{color:'var(--success-text)', fontSize:'0.9rem'}}>● System Online</span>
      </div>
      
      {showOnboarding && (
        <section className="glass-card" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(15, 23, 42, 0.4))'}}>
           <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
             <h3>🚀 Onboarding Progress</h3>
             <span style={{fontWeight:'bold', color:'var(--primary)'}}>{progress}%</span>
           </div>
           <div style={{background:'rgba(255,255,255,0.1)', height:'6px', borderRadius:'3px', marginBottom:'1rem'}}>
             <div style={{width: `${progress}%`, background:'var(--primary)', height:'100%', borderRadius:'3px'}}></div>
           </div>
           <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem'}}>
             {onboardingSteps.map(step => (
               <div key={step.id} style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                 <input type="checkbox" checked={step.done} onChange={() => toggleOnboardingStep(step.id)} style={{marginBottom:0, width:'auto'}} />
                 <span style={{textDecoration: step.done ? 'line-through' : 'none', color: step.done ? 'var(--text-muted)' : 'var(--text-main)'}}>{step.text}</span>
               </div>
             ))}
           </div>
        </section>
      )}

      {announcements.length > 0 && (
        <section className="glass-card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
             <h3 style={{marginBottom: '0.5rem', color:'var(--primary)'}}>LATEST UPDATE</h3>
             <span style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>{new Date(announcements[0].date).toLocaleDateString()}</span>
          </div>
          <h2 style={{border:'none', color:'var(--text-main)', textTransform:'none', fontSize:'1.5rem'}}>{announcements[0].title}</h2>
          <p style={{color: 'var(--text-muted)'}}>{announcements[0].content}</p>
        </section>
      )}

      <div className="dashboard-grid">
        <div className="stat-card glass-card">
           <h3>Task Load</h3>
           <span className="stat-number">{pendingTasks}</span>
           <p style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>Pending Assignments</p>
        </div>

        <div className="stat-card glass-card">
           <h3>Daily Pulse Check</h3>
           <p style={{color:'var(--text-muted)', fontSize:'0.9rem', marginBottom:'1rem'}}>How are you feeling today?</p>
           <div style={{display:'flex', gap:'0.5rem'}}>
             {['Happy', 'Neutral', 'Stressed'].map(m => (
               <button key={m} onClick={() => handlePulse(m)} style={{flex:1, padding:'0.5rem', fontSize:'1.2rem', background: mood === m ? 'var(--primary)' : 'rgba(255,255,255,0.05)', border: mood === m ? 'none' : '1px solid var(--glass-border)'}}>{m === 'Happy' ? '😄' : m === 'Neutral' ? '😐' : '😫'}</button>
             ))}
           </div>
           {mood && <p style={{marginTop:'0.5rem', fontSize:'0.8rem', textAlign:'center', color:'var(--primary)'}}>Status Logged.</p>}
        </div>
        
        <div className="stat-card glass-card">
           <h3>Personnel Status</h3>
           <div style={{marginTop:'1rem'}}>
             {usersOnLeave.length === 0 && <p style={{color: 'var(--text-muted)', fontStyle:'italic'}}>All units active.</p>}
             {usersOnLeave.map(u => (
               <div key={u.id} style={{display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.75rem', background:'rgba(255,255,255,0.03)', padding:'0.5rem', borderRadius:'6px'}}>
                 <span style={{width:'6px', height:'6px', borderRadius:'50%', background:'var(--danger-text)'}}></span>
                 <span>{u.name}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPage;