import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function PayrollPage() {
  const { user } = useAuth();
  const { getPayrollForUser } = useData();
  const payrolls = getPayrollForUser(user.id);

  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Payroll & Invoices</h1>

      <section className="glass-card">
        <h3>Salary History</h3>
        <div className="table-container" style={{marginTop:'1rem'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Date Processed</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payrolls.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.month}</strong></td>
                  <td style={{fontFamily:'monospace'}}>{p.date}</td>
                  <td>{p.amount}</td>
                  <td><span className="status status-Done">{p.status}</span></td>
                  <td><button className="secondary" style={{padding:'0.3rem 0.8rem', fontSize:'0.8rem'}}>Download PDF</button></td>
                </tr>
              ))}
              {payrolls.length === 0 && <tr><td colSpan="5" style={{padding:'2rem', textAlign:'center'}}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      
      <div className="dashboard-grid" style={{marginTop:'2rem'}}>
         <div className="glass-card">
            <h3>Tax Documents</h3>
            <p style={{color:'var(--text-muted)'}}>Form 16 and Tax Certifications.</p>
            <button style={{marginTop:'1rem'}}>View Documents</button>
         </div>
         <div className="glass-card">
            <h3>Bank Details</h3>
            <p style={{color:'var(--text-muted)'}}>HDFC Bank - **** 8921</p>
            <button className="secondary" style={{marginTop:'1rem'}}>Update</button>
         </div>
      </div>
    </motion.div>
  );
}

export default PayrollPage;