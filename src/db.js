// src/db.js
// Dexie.js database definition
// Tables: projects, steps, tasks

import Dexie from 'dexie'

export const db = new Dexie('PlannerDB')

db.version(1).stores({
  projects: 'id, name, createdAt',
  steps: 'id, projectId, order',
  tasks: 'id, stepId, completed, createdAt',
})
