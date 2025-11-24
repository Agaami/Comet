import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function TaskDetailPage() {
  const { taskId } = useParams();
  const { user } = useAuth();
  const { getTaskById, getUserById, updateTaskStatus, getCommentsForTask, addComment } = useData();
  const [newComment, setNewComment] = useState('');

  const task = getTaskById(taskId);
  const comments = getCommentsForTask(taskId);

  if (!task) {
    return <div className="page-container"><h1>Task Not Found</h1><Link to="/tasks" className="button">Back</Link></div>;
  }

  const assignedUser = getUserById(task.assignedToId);
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(taskId, user.id, newComment);
    setNewComment('');
  };

  return (
    <div className="page-container">
      <section className="glass-card">
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <h1>{task.title}</h1>
          <select value={task.status} onChange={(e) => updateTaskStatus(task.id, e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="dashboard-grid" style={{marginTop:'1rem'}}>
           <div className="stat-card" style={{background:'rgba(0,0,0,0.2)', padding:'1rem', borderRadius:'8px'}}>
             <h3>Priority</h3>
             <span className={`priority priority-${task.priority}`}>{task.priority}</span>
           </div>
           <div className="stat-card" style={{background:'rgba(0,0,0,0.2)', padding:'1rem', borderRadius:'8px'}}>
             <h3>Deadline</h3>
             <p>{task.deadline}</p>
           </div>
           <div className="stat-card" style={{background:'rgba(0,0,0,0.2)', padding:'1rem', borderRadius:'8px'}}>
             <h3>Assigned To</h3>
             <p>{assignedUser?.name}</p>
           </div>
        </div>
      </section>

      <section className="glass-card">
        <h2>Comments</h2>
        <div className="doc-list">
          {comments.map(c => {
            const author = getUserById(c.authorId);
            return (
              <div key={c.id} className="comment-item">
                <strong>{author?.name}</strong> <span style={{fontSize:'0.8rem', opacity:0.7}}>{new Date(c.date).toLocaleString()}</span>
                <p style={{marginTop:'0.5rem'}}>{c.content}</p>
              </div>
            )
          })}
        </div>
        <form onSubmit={handleCommentSubmit} style={{marginTop:'1rem'}}>
          <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." />
          <button type="submit">Post</button>
        </form>
      </section>
    </div>
  );
}

export default TaskDetailPage;