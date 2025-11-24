import { useData } from '../contexts/DataContext';
import { motion } from 'framer-motion';

function RecruitmentPage() {
  const { jobs, referCandidate } = useData();

  const handleRefer = (jobId) => {
    const name = prompt("Enter Candidate Name:");
    if (name) {
      referCandidate(jobId, name);
      alert("Candidate Referred!");
    }
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
         <h1>Reference & Openings</h1> {/* Renamed */}
         <button>+ Post Job</button>
      </div>

      <div className="dashboard-grid">
        {jobs.map(job => (
          <div key={job.id} className="glass-card" style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
               <span style={{background:'var(--primary-glow)', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.7rem', color:'var(--primary)'}}>
                 {job.department}
               </span>
               <span style={{color:'var(--success-text)', fontSize:'0.8rem'}}>● {job.status}</span>
            </div>
            <h3>{job.title}</h3>
            <p style={{color:'var(--text-muted)', fontSize:'0.9rem'}}>Candidates in pipeline: {job.candidates}</p>
            <div style={{marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid var(--glass-border)'}}>
               <button className="secondary" style={{width:'100%'}} onClick={() => handleRefer(job.id)}>Refer Candidate</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default RecruitmentPage;