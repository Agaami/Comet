import { useData } from '../contexts/DataContext';
import { MOCK_BURNDOWN } from '../data/mockData';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

function AnalyticsPage() {
  const { tasks, timesheets, users } = useData();

  const statusCounts = { 'To Do': 0, 'In Progress': 0, 'Done': 0 };
  tasks.forEach(t => {
    if (statusCounts[t.status] !== undefined) statusCounts[t.status]++;
  });
  const taskData = Object.keys(statusCounts).map(key => ({ name: key, value: statusCounts[key] }));

  const hoursData = users.map(u => {
    const total = timesheets
      .filter(t => t.userId === u.id)
      .reduce((acc, curr) => acc + curr.hours, 0);
    return { name: u.name.split(' ')[0], hours: total };
  });

  const COLORS = ['#3b82f6', '#fbbf24', '#34d399'];

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Analytics & Insights</h1>

      <div className="dashboard-grid">
        
        {/* Sprint Burndown (New) */}
        <section className="glass-card" style={{gridColumn: 'span 2'}}>
           <h3>Sprint Burndown</h3>
           <p style={{color:'var(--text-muted)', fontSize:'0.8rem'}}>Velocity vs Ideal</p>
           <div style={{ height: 300, width: '100%', marginTop: '1rem' }}>
            <ResponsiveContainer>
              <LineChart data={MOCK_BURNDOWN}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--glass-border)', borderRadius:'8px'}}
                  itemStyle={{color: 'var(--text-main)'}}
                />
                <Legend />
                <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Task Status */}
        <section className="glass-card">
          <h3>Task Distribution</h3>
          <div style={{ height: 250, width: '100%', marginTop: '1rem' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {taskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--glass-border)', borderRadius:'8px'}}
                  itemStyle={{color: 'var(--text-main)'}}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Team Velocity */}
        <section className="glass-card">
          <h3>Hours Logged</h3>
          <div style={{ height: 250, width: '100%', marginTop: '1rem' }}>
            <ResponsiveContainer>
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{backgroundColor: 'var(--bg-sidebar)', border: '1px solid var(--glass-border)', borderRadius:'8px'}}
                  itemStyle={{color: 'var(--text-main)'}}
                />
                <Bar dataKey="hours" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </motion.div>
  );
}

export default AnalyticsPage;