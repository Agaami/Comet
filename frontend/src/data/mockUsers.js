// src/data/mockUsers.js
export const MOCK_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@comet.com",
    password: "admin", // In a real app, NEVER store plain text passwords
    role: "Admin",
    title: "Founder"
  },
  {
    id: 2,
    name: "Member User",
    email: "member@comet.com",
    password: "member",
    role: "Member",
    title: "Developer"
  }
];