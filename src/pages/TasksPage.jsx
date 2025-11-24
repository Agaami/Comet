import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';

const isOverdue = (deadline) => {
  if (!deadline) return false;
  const today = new Date();
  today.setHours(0,0,0,0);
  return new Date(deadline) < today;
};

function TasksPage() {
  const { user } = useAuth();
  const { users, tasks, addTask, getUserById, updateTaskStatus } = useData();
  
  const [title, setTitle] = useState('');
  const [assignedToId, setAssignedToId] = useState(users[0]?.id || '');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [viewMode, setViewMode] = useState('kanban'); 

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !assignedToId || !deadline) return;
    addTask({ title, assignedToId: parseInt(assignedToId), deadline, priority });
    setTitle(''); setDeadline('');
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    updateTaskStatus(parseInt(result.draggableId), result.destination.droppableId);
  };

  const columns = {
    'To Do': tasks.filter(t => t.status === 'To Do'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Done': tasks.filter(t => t.status === 'Done'),
  };

  return (
    <motion.div 
      className="page-container" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
    >
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Task Board</h1>
        
        {/* Toggle Buttons */}
        <div style={{display:'flex', gap:'0.5rem'}}>
          <button className={viewMode === 'kanban' ? '' : 'secondary'} onClick={() => setViewMode('kanban')}>Board</button>
          <button className={viewMode === 'table' ? '' : 'secondary'} onClick={() => setViewMode('table')}>List</button>
        </div>
      </div>
      
      {/* Creation Bar */}
      <section className="glass-card" style={{padding:'1rem'}}>
        <form onSubmit={handleCreate} style={{display:'flex', gap:'1rem', alignItems:'center', flexWrap:'wrap'}}>
          <strong style={{whiteSpace:'nowrap'}}>New Task:</strong>
          <input style={{marginBottom:0, flex:1}} placeholder="Enter task title..." value={title} onChange={e=>setTitle(e.target.value)} />
          <select style={{marginBottom:0, width:'150px'}} value={assignedToId} onChange={e=>setAssignedToId(e.target.value)}>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
           <select style={{marginBottom:0, width:'100px'}} value={priority} onChange={e=>setPriority(e.target.value)}>
               <option value="High">High</option>
               <option value="Medium">Med</option>
               <option value="Low">Low</option>
             </select>
          <input type="date" style={{marginBottom:0}} value={deadline} onChange={e=>setDeadline(e.target.value)} />
          <button type="submit" style={{marginBottom:0}}>Create</button>
        </form>
      </section>

      {/* --- KANBAN VIEW --- */}
      {viewMode === 'kanban' && (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board">
            {Object.keys(columns).map(columnId => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <div 
                    className="kanban-column"
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                  >
                    <h3>{columnId} <span style={{color:'var(--text-muted)', marginLeft:'0.5rem'}}>{columns[columnId].length}</span></h3>
                    
                    {columns[columnId].map((task, index) => {
                       const u = getUserById(task.assignedToId);
                       return (
                         <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                           {(provided) => (
                             <div
                               className="kanban-card"
                               ref={provided.innerRef}
                               {...provided.draggableProps}
                               {...provided.dragHandleProps}
                               style={{...provided.draggableProps.style}}
                             >
                               <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                                 <span className={`priority priority-${task.priority}`}>{task.priority}</span>
                                 {isOverdue(task.deadline) && task.status !== 'Done' && <span className="status status-Overdue">Due</span>}
                               </div>
                               <div style={{fontWeight:'500', marginBottom:'0.5rem'}}>{task.title}</div>
                               <div style={{fontSize:'0.8rem', color:'var(--text-muted)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                 <span>{u?.name}</span>
                                 <span>{task.deadline}</span>
                               </div>
                               <Link to={`/tasks/${task.id}`} style={{fontSize:'0.8rem', color:'var(--primary)', marginTop:'0.5rem', display:'block', textDecoration:'none'}}>Details</Link>
                             </div>
                           )}
                         </Draggable>
                       );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      {/* --- TABLE VIEW --- */}
      {viewMode === 'table' && (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr><th>Title</th><th>Assignee</th><th>Status</th><th>Priority</th><th>Deadline</th></tr>
            </thead>
            <tbody>
              {tasks.map(task => {
                 const u = getUserById(task.assignedToId);
                 return (
                   <tr key={task.id}>
                     <td><Link to={`/tasks/${task.id}`}>{task.title}</Link></td>
                     <td>{u?.name}</td>
                     <td><span className={`status status-${task.status.replace(' ','')}`}>{task.status}</span></td>
                     <td><span className={`priority priority-${task.priority}`}>{task.priority}</span></td>
                     <td>{task.deadline}</td>
                   </tr>
                 )
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default TasksPage;