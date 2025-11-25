import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

function ProfilePage() {
  const { user, updateUser: updateAuthUser } = useAuth();
  const { updateUserProfile } = useData();

  const [title, setTitle] = useState(user.title);
  const [name, setName] = useState(user.name);
  const [success, setSuccess] = useState('');

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...user, name, title };
    
    // Update in data context (for all users)
    updateUserProfile(user.id, updatedData);
    
    // Update in auth context (for the logged-in user)
    updateAuthUser(updatedData);
    
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };
  
  // Note: Password change is complex without a backend.
  // This form just updates title and name.

  return (
    <div className="page-container">
      <h1>My Profile</h1>
      
      <section className="glass-card profile-card">
        <h2>Edit My Info</h2>
        <form onSubmit={handleProfileSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              disabled
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <button type="submit">Save Changes</button>
          {success && <p style={{color: 'var(--success)', marginTop: '1rem'}}>{success}</p>}
        </form>
      </section>
    </div>
  );
}

export default ProfilePage;