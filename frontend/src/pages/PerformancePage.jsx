import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function PerformancePage() {
  const { user } = useAuth();
  const { getReviewsForUser, submitReview } = useData();
  const myReviews = getReviewsForUser(user.id);

  const handleSelfReview = (id) => {
    const rating = prompt("Enter your self rating (1-5):");
    if (rating) {
      submitReview(id, { selfRating: parseFloat(rating) });
      alert("Self review submitted!");
    }
  };

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Performance Reviews</h1>

      <div className="dashboard-grid">
        {myReviews.map(review => (
          <section key={review.id} className="glass-card" style={{borderTop: review.status === 'Completed' ? '3px solid var(--success-text)' : '3px solid var(--warning-text)'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <h3>{review.cycle} Cycle</h3>
              <span className={`status status-${review.status.split(' ')[0]}`}>{review.status}</span>
            </div>
            
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1rem'}}>
              <div style={{background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'8px', textAlign:'center'}}>
                <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Manager Rating</div>
                <div style={{fontSize:'1.5rem', fontWeight:'bold'}}>{review.managerRating || '-'}</div>
              </div>
              <div style={{background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'8px', textAlign:'center'}}>
                <div style={{fontSize:'0.8rem', color:'var(--text-muted)'}}>Self Rating</div>
                <div style={{fontSize:'1.5rem', fontWeight:'bold'}}>{review.selfRating || '-'}</div>
              </div>
            </div>
            
            {review.feedback && (
              <div style={{background:'rgba(255,255,255,0.05)', padding:'1rem', borderRadius:'8px'}}>
                 <strong style={{fontSize:'0.9rem'}}>Manager Feedback:</strong>
                 <p style={{fontSize:'0.9rem', marginTop:'0.5rem', color:'var(--text-muted)'}}>{review.feedback}</p>
              </div>
            )}

            {review.status.includes('Pending') && (
               <button onClick={() => handleSelfReview(review.id)} style={{marginTop:'1rem', width:'100%'}}>Complete Self Assessment</button>
            )}
          </section>
        ))}
      </div>
    </motion.div>
  );
}

export default PerformancePage;