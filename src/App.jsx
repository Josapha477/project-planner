// src/App.jsx
// Root component: wires together state, hooks and layout

import { useState, useEffect } from 'react'
import { useProjects } from './hooks/useProjects'
import { useSteps } from './hooks/useSteps'
import { useTasks } from './hooks/useTasks'
import { Sidebar } from './components/Sidebar'
import { ProjectView } from './components/ProjectView'

export default function App() {
  // Persist selected project across reloads
  const [selectedProjectId, setSelectedProjectId] = useState(() => {
    return localStorage.getItem('selectedProjectId') || null
  })

  const { projects, createProject, deleteProject } = useProjects()
  const { steps, addStep, deleteStep } = useSteps(selectedProjectId)
  const { tasks, addTask, toggleTask, deleteTask } = useTasks(steps.map((s) => s.id))

  // Derive selected project object
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null

  // If the selected project gets deleted, clear selection
  useEffect(() => {
    if (selectedProjectId && !projects.find((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(null)
    }
  }, [projects, selectedProjectId])

  const handleSelect = (id) => {
    setSelectedProjectId(id)
    localStorage.setItem('selectedProjectId', id)
  }

  const handleDeleteProject = async (id) => {
    await deleteProject(id)
    if (selectedProjectId === id) {
      setSelectedProjectId(null)
      localStorage.removeItem('selectedProjectId')
    }
  }

  return (
    <div className="md:flex h-full w-full">
      <Sidebar
        projects={projects}
        selectedId={selectedProjectId}
        onSelect={handleSelect}
        onCreate={createProject}
        onDelete={handleDeleteProject}
      />
      <ProjectView
        project={selectedProject}
        steps={steps}
        tasks={tasks}
        onAddStep={addStep}
        onDeleteStep={deleteStep}
        onAddTask={addTask}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  )
}
