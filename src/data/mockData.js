export const MOCK_USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@comet.com',
    password: 'admin',
    role: 'Admin',
    title: 'Founder / CEO',
    documents: [],
    onboardingComplete: true,
  },
  {
    id: 2,
    name: 'Member User',
    email: 'member@comet.com',
    password: 'member',
    role: 'Member',
    title: 'Software Engineer',
    documents: [
      { name: 'Offer Letter', url: '#', version: '1.0' },
      { name: 'Employee Handbook', url: '#', version: '2.3' }
    ],
    onboardingComplete: false, // Triggers checklist
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@comet.com',
    password: 'jane',
    role: 'Member',
    title: 'UX Designer',
    documents: [],
    onboardingComplete: true,
  },
];

export const MOCK_TASKS = [
  {
    id: 101,
    title: 'Develop login page',
    assignedToId: 2,
    status: 'Done',
    priority: 'High',
    deadline: '2025-11-20',
  },
  {
    id: 102,
    title: 'Design dashboard wireframes',
    assignedToId: 3,
    status: 'In Progress',
    priority: 'Medium',
    deadline: '2025-11-22',
  },
  {
    id: 103,
    title: 'Set up CI/CD pipeline',
    assignedToId: 1,
    status: 'To Do',
    priority: 'High',
    deadline: '2025-11-15',
  },
  {
    id: 104,
    title: 'Create leave request flow',
    assignedToId: 2,
    status: 'To Do',
    priority: 'Low',
    deadline: '2025-11-24',
  },
];

export const MOCK_LEAVES = [
  {
    id: 201,
    userId: 2,
    reason: 'Vacation',
    status: 'Approved',
    startDate: '2025-11-28',
    endDate: '2025-11-30',
  },
  {
    id: 202,
    userId: 3,
    reason: 'Dentist Appointment',
    status: 'Pending',
    startDate: '2025-11-21',
    endDate: '2025-11-21',
  },
];

export const MOCK_ANNOUNCEMENTS = [
  {
    id: 301,
    title: 'Q4 Performance Reviews',
    content: 'Please complete your self-assessment by Friday.',
    authorId: 1,
    date: new Date().toISOString(),
  },
];

export const MOCK_COMMENTS = [];

export const MOCK_KB_ARTICLES = [
  {
    id: 501,
    category: 'Company Policy',
    title: 'Remote Work Policy',
    content: 'Employees are allowed to work remotely 3 days a week.',
  },
  {
    id: 503,
    category: 'Technical Guide',
    title: 'Git Workflow',
    content: 'We use the Feature Branch workflow.',
  },
];

export const MOCK_GLOBAL_CHAT = [
  {
    id: 601,
    userId: 1,
    message: 'Welcome to the new team chat!',
    timestamp: '2025-11-18T09:00:00Z',
  },
];

export const MOCK_TIMESHEETS = [
  { id: 701, userId: 2, date: '2025-11-17', hours: 8, description: 'Worked on Login API' },
];

export const MOCK_PULSE = [];

export const MOCK_ATTENDANCE = [];

export const MOCK_JOBS = [
  { id: 901, title: 'Senior React Developer', department: 'Engineering', status: 'Open', candidates: 2 },
  { id: 902, title: 'Growth Marketer', department: 'Marketing', status: 'Open', candidates: 5 },
];

export const MOCK_NOTIFICATIONS = [
  { id: 1001, userId: 2, text: 'Your leave request was approved.', read: false },
];

export const MOCK_BURNDOWN = [
  { day: 'Mon', ideal: 40, actual: 40 },
  { day: 'Tue', ideal: 30, actual: 35 },
  { day: 'Wed', ideal: 20, actual: 28 },
  { day: 'Thu', ideal: 10, actual: 15 },
  { day: 'Fri', ideal: 0, actual: 5 },
];

// --- NEW DATA PHASE 4 ---

export const MOCK_PAYROLL = [
  { id: 1101, userId: 2, month: 'October 2025', amount: '$5,000', status: 'Paid', date: '2025-10-31' },
  { id: 1102, userId: 2, month: 'September 2025', amount: '$5,000', status: 'Paid', date: '2025-09-30' },
];

export const MOCK_REVIEWS = [
  { 
    id: 1201, 
    userId: 2, 
    cycle: 'Q3 2025', 
    managerRating: 4.5, 
    selfRating: 4.0, 
    feedback: 'Excellent work on the frontend migration. Needs to improve documentation.',
    status: 'Completed'
  },
  { 
    id: 1202, 
    userId: 2, 
    cycle: 'Q4 2025', 
    managerRating: 0, 
    selfRating: 0, 
    feedback: '',
    status: 'Pending Self-Review'
  },
];

export const MOCK_ONBOARDING_STEPS = [
  { id: 1, text: 'Complete User Profile', done: true },
  { id: 2, text: 'Read Employee Handbook', done: false },
  { id: 3, text: 'Sign Offer Letter', done: true },
  { id: 4, text: 'Join Slack Channel', done: false },
];