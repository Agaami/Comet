import { motion } from 'framer-motion';
import { useState } from 'react';

function SettingsPage() {
  const [integrations, setIntegrations] = useState({
    slack: true,
    github: false,
    google: true
  });

  const toggle = (key) => setIntegrations(prev => ({...prev, [key]: !prev[key]}));

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Settings & Integrations</h1>
      
      <div className="dashboard-grid">
        <section className="glass-card">
          <h3>Connected Apps</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem', marginTop:'1rem'}}>
             
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', border:'1px solid var(--glass-border)', borderRadius:'8px'}}>
               <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                 <div style={{fontSize:'1.5rem'}}>🤖</div>
                 <div>
                   <strong>Slack</strong>
                   <p style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Channel alerts for tasks</p>
                 </div>
               </div>
               <button className={integrations.slack ? 'danger' : ''} onClick={() => toggle('slack')}>
                 {integrations.slack ? 'Disconnect' : 'Connect'}
               </button>
             </div>

             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', border:'1px solid var(--glass-border)', borderRadius:'8px'}}>
               <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                 <div style={{fontSize:'1.5rem'}}>🐙</div>
                 <div>
                   <strong>GitHub</strong>
                   <p style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Link commits to tasks</p>
                 </div>
               </div>
               <button className={integrations.github ? 'danger' : ''} onClick={() => toggle('github')}>
                 {integrations.github ? 'Disconnect' : 'Connect'}
               </button>
             </div>

          </div>
        </section>

        <section className="glass-card">
          <h3>Security</h3>
          <p style={{color:'var(--text-muted)', marginBottom:'1rem'}}>Manage access logs and passwords.</p>
          <button className="secondary" style={{width:'100%', marginBottom:'0.5rem'}}>Export Data (GDPR)</button>
          <button className="secondary" style={{width:'100%'}}>Change Password</button>
        </section>
      </div>
    </motion.div>
  );
}

export default SettingsPage;