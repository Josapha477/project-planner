// src/App.jsx
// Root component: wires together state, hooks and layout

import { useState, useEffect } from 'react'
import { useProjects } from './hooks/useProjects'
import { useSteps } from './hooks/useSteps'
import { useTasks } from './hooks/useTasks'
import { Sidebar } from './components/Sidebar'
import { ProjectView } from './components/ProjectView'

export default function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(() =>
    localStorage.getItem('selectedProjectId') || null
  )
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const { projects, createProject, deleteProject } = useProjects()
  const { steps, addStep, deleteStep } = useSteps(selectedProjectId)
  const { tasks, addTask, toggleTask, deleteTask } = useTasks(steps.map((s) => s.id))

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null

  // Clear selection if project was deleted
  useEffect(() => {
    if (selectedProjectId && !projects.find((p) => p.id === selectedProjectId)) {
      setSelectedProjectId(null)
      localStorage.removeItem('selectedProjectId')
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
    <div className="flex h-full overflow-hidden">
      <Sidebar
        projects={projects}
        selectedId={selectedProjectId}
        onSelect={handleSelect}
        onCreate={createProject}
        onDelete={handleDeleteProject}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
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
        onMenuOpen={() => setMobileSidebarOpen(true)}
      />
    </div>
  )
}
