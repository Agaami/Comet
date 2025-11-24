import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  MOCK_USERS, MOCK_TASKS, MOCK_LEAVES, MOCK_ANNOUNCEMENTS, MOCK_COMMENTS,
  MOCK_KB_ARTICLES, MOCK_GLOBAL_CHAT, MOCK_TIMESHEETS, MOCK_PULSE,
  MOCK_ATTENDANCE, MOCK_JOBS, MOCK_NOTIFICATIONS,
  MOCK_PAYROLL, MOCK_ONBOARDING_STEPS
} from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [users, setUsers] = useLocalStorage('cometUsers_v5', MOCK_USERS);
  const [tasks, setTasks] = useLocalStorage('cometTasks_v5', MOCK_TASKS);
  const [leaves, setLeaves] = useLocalStorage('cometLeaves_v5', MOCK_LEAVES);
  const [announcements, setAnnouncements] = useLocalStorage('cometAnn_v5', MOCK_ANNOUNCEMENTS);
  const [comments, setComments] = useLocalStorage('cometComments_v5', MOCK_COMMENTS);
  const [kbArticles, setKbArticles] = useLocalStorage('cometKB_v5', MOCK_KB_ARTICLES);
  const [globalChat, setGlobalChat] = useLocalStorage('cometChat_v5', MOCK_GLOBAL_CHAT);
  const [timesheets, setTimesheets] = useLocalStorage('cometTime_v5', MOCK_TIMESHEETS);
  const [pulseData, setPulseData] = useLocalStorage('cometPulse_v5', MOCK_PULSE);
  const [attendance, setAttendance] = useLocalStorage('cometAttendance_v5', MOCK_ATTENDANCE);
  const [jobs, setJobs] = useLocalStorage('cometJobs_v5', MOCK_JOBS);
  const [notifications, setNotifications] = useLocalStorage('cometNotif_v5', MOCK_NOTIFICATIONS);
  
  // New State (Reviews removed)
  const [payroll, setPayroll] = useLocalStorage('cometPayroll_v5', MOCK_PAYROLL);
  const [onboardingSteps, setOnboardingSteps] = useLocalStorage('cometOnboarding_v5', MOCK_ONBOARDING_STEPS);

  // --- Auto Attendance ---
  const markAttendance = (userId) => {
    const today = new Date().toISOString().split('T')[0];
    const exists = attendance.find(a => a.userId === userId && a.date === today);
    if (!exists) {
      const newRecord = { id: Date.now(), userId, date: today, checkIn: new Date().toLocaleTimeString(), status: 'Present' };
      setAttendance(prev => [...prev, newRecord]);
    }
  };

  // --- Standard CRUD ---
  const addTask = (taskData) => {
    const newTask = { ...taskData, id: Date.now(), status: 'To Do' };
    setTasks(prev => [newTask, ...prev]);
    addNotification(taskData.assignedToId, `New task assigned: ${taskData.title}`);
  };
  const updateTaskStatus = (taskId, status) => setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, status } : t)));
  const getTasksForUser = (userId) => tasks.filter(t => t.assignedToId === userId);
  const getTaskById = (taskId) => tasks.find(t => t.id.toString() === taskId.toString());
  const addLeaveRequest = (leaveData) => setLeaves(prev => [{ ...leaveData, id: Date.now(), status: 'Pending' }, ...prev]);
  const approveLeave = (leaveId) => setLeaves(prev => prev.map(l => l.id === leaveId ? { ...l, status: 'Approved' } : l));
  const getLeavesForUser = (userId) => leaves.filter(l => l.userId === userId);
  const getUserById = (userId) => users.find(u => u.id === userId);
  const updateUserProfile = (userId, data) => setUsers(prev => prev.map(u => u.id === userId ? {...u, ...data} : u));
  
  // --- Notifications ---
  const addNotification = (userId, text) => setNotifications(prev => [{ id: Date.now(), userId, text, read: false }, ...prev]);
  const markNotificationsRead = (userId) => setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  const getNotifications = (userId) => notifications.filter(n => n.userId === userId);

  // --- Feature Handlers (Reviews removed) ---
  const getPayrollForUser = (userId) => payroll.filter(p => p.userId === userId);
  const toggleOnboardingStep = (stepId) => {
    setOnboardingSteps(prev => prev.map(s => s.id === stepId ? { ...s, done: !s.done } : s));
  };

  // --- Misc ---
  const addAnnouncement = (t, c, aid) => setAnnouncements(prev => [{ id: Date.now(), title: t, content: c, authorId: aid, date: new Date().toISOString() }, ...prev]);
  const deleteAnnouncement = (id) => setAnnouncements(prev => prev.filter(a => a.id !== id));
  const getCommentsForTask = (tid) => comments.filter(c => c.taskId.toString() === tid.toString());
  const addComment = (tid, aid, c) => setComments(prev => [...prev, { id: Date.now(), taskId: parseInt(tid), authorId: aid, content: c, date: new Date().toISOString() }]);
  const sendChatMessage = (uid, m) => setGlobalChat(prev => [...prev, { id: Date.now(), userId: uid, message: m, timestamp: new Date().toISOString() }]);
  const logTime = (e) => setTimesheets(prev => [{ ...e, id: Date.now() }, ...prev]);
  const getTimesheetsForUser = (uid) => timesheets.filter(t => t.userId === uid);
  const submitPulse = (uid, m) => {
    const today = new Date().toISOString().split('T')[0];
    const filtered = pulseData.filter(p => !(p.userId === uid && p.date === today));
    setPulseData([...filtered, { id: Date.now(), userId: uid, date: today, mood: m }]);
  };
  const addUserDocument = (uid, n, u) => setUsers(prev => prev.map(user => user.id !== uid ? user : { ...user, documents: [...(user.documents||[]), { name: n, url: u }] }));
  const referCandidate = (jid, name) => setJobs(prev => prev.map(j => j.id === jid ? { ...j, candidates: j.candidates + 1 } : j));

  const dataValue = {
    users, tasks, leaves, announcements, kbArticles, globalChat, timesheets, pulseData, 
    attendance, jobs, notifications, payroll, onboardingSteps,
    addTask, updateTaskStatus, getTasksForUser, getTaskById,
    addLeaveRequest, approveLeave, getLeavesForUser,
    getUserById, updateUserProfile, addUserDocument,
    addAnnouncement, deleteAnnouncement,
    getCommentsForTask, addComment, sendChatMessage,
    logTime, getTimesheetsForUser, submitPulse,
    markAttendance, referCandidate, 
    getNotifications, markNotificationsRead,
    getPayrollForUser, toggleOnboardingStep
  };

  return <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);