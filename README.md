# Planner

A local-first project planning app. No backend, no auth — everything lives in your browser via IndexedDB.

## Stack

- **React** + **Vite**
- **TailwindCSS**
- **Dexie.js** (IndexedDB wrapper)

## Features

- Create / delete projects
- Add steps inside a project
- Add tasks inside steps
- Toggle task completion
- Delete steps and tasks
- Progress bar per step
- Persists selected project across reloads

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
  db.js                  # Dexie database (projects, steps, tasks)
  hooks/
    useProjects.js       # Project CRUD
    useSteps.js          # Step CRUD
    useTasks.js          # Task CRUD
  components/
    Sidebar.jsx          # Left panel — project list
    ProjectView.jsx      # Main content area
    StepCard.jsx         # One step + its tasks
    TaskItem.jsx         # Individual task row
  App.jsx                # Root layout + state wiring
  main.jsx               # Entry point
```
