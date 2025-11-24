import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import HRPage from './pages/HRPage';
import ProfilePage from './pages/ProfilePage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import TimesheetPage from './pages/TimesheetPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AdminPage from './pages/AdminPage';
import RecruitmentPage from './pages/RecruitmentPage';
import SettingsPage from './pages/SettingsPage';
import PayrollPage from './pages/PayrollPage';
// PerformancePage removed

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:taskId" element={<TaskDetailPage />} />
        <Route path="hr" element={<HRPage />} />
        <Route path="payroll" element={<PayrollPage />} />
        {/* Performance Route Removed */}
        <Route path="kb" element={<KnowledgeBasePage />} />
        <Route path="timesheets" element={<TimesheetPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="recruitment" element={<RecruitmentPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin" element={<ProtectedRoute requireAdmin={true}><AdminPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;