// src/utils/helpers.js

export function checkOverdue(deadline) {
  if (!deadline) return false;
  
  // Create a 'today' date object set to midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse the deadline string. 'YYYY-MM-DD' is parsed as UTC.
  // We add 'T00:00:00' to ensure it's treated as local timezone.
  const taskDate = new Date(deadline + 'T00:00:00');
  
  // An item is overdue if its deadline was *before* today
  return taskDate < today;
}