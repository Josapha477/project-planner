// src/components/ProjectView.jsx
// Main content area — steps + tasks for selected project
// Includes mobile top bar with hamburger menu

import { useState } from 'react'
import { Plus, Layers, Menu, LayoutList } from 'lucide-react'
import { StepCard } from './StepCard'

export function ProjectView({ project, steps, tasks, onAddStep, onDeleteStep, onAddTask, onToggleTask, onDeleteTask, onMenuOpen }) {
  const [stepInput, setStepInput] = useState('')
  const [addingStep, setAddingStep] = useState(false)

  const totalTasks = tasks.length
  const doneTasks = tasks.filter((t) => t.completed).length

  if (!project) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        {/* Mobile top bar */}
        <MobileTopBar onMenuOpen={onMenuOpen} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-xs">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LayoutList size={28} className="text-brand-400" />
            </div>
            <h2 className="font-semibold text-gray-700 mb-1">No project selected</h2>
            <p className="text-sm text-gray-400">Select a project from the sidebar or create a new one to get started.</p>
          </div>
        </div>
      </div>
    )
  }

  const handleAddStep = () => {
    if (!stepInput.trim()) return
    onAddStep(stepInput)
    setStepInput('')
    setAddingStep(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddStep()
    if (e.key === 'Escape') { setAddingStep(false); setStepInput('') }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      {/* Mobile top bar */}
      <MobileTopBar onMenuOpen={onMenuOpen} title={project.name} />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-6 md:px-8 py-5">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">{project.name}</h1>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Layers size={11} /> {steps.length} step{steps.length !== 1 ? 's' : ''}
          </span>
          {totalTasks > 0 && (
            <>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">
                {doneTasks}/{totalTasks} tasks done
              </span>
              {/* Overall progress */}
              <div className="flex-1 max-w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full transition-all duration-500"
                  style={{ width: `${(doneTasks / totalTasks) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 md:px-8 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              tasks={tasks.filter((t) => t.stepId === step.id)}
              onAddTask={onAddTask}
              onToggleTask={onToggleTask}
              onDeleteTask={onDeleteTask}
              onDeleteStep={onDeleteStep}
            />
          ))}

          {/* Add step */}
          <div className="mt-2">
            {addingStep ? (
              <div className="flex gap-2">
                <input
                  autoFocus
                  className="flex-1 text-sm px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 shadow-sm placeholder:text-gray-300 transition"
                  placeholder="Step title…"
                  value={stepInput}
                  onChange={(e) => setStepInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={() => { if (!stepInput.trim()) setAddingStep(false) }}
                />
                <button
                  onClick={handleAddStep}
                  className="px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Add step
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAddingStep(true)}
                className="w-full flex items-center gap-2 px-4 py-3.5 rounded-xl border-2 border-dashed border-gray-200 hover:border-brand-400 hover:bg-white text-gray-400 hover:text-brand-600 text-sm font-medium transition-all group"
              >
                <Plus size={16} className="group-hover:scale-110 transition-transform" />
                Add a step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile-only top bar with hamburger
function MobileTopBar({ onMenuOpen, title }) {
  return (
    <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
      <button
        onClick={onMenuOpen}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <Menu size={20} />
      </button>
      {title && <span className="font-semibold text-gray-800 text-sm truncate">{title}</span>}
    </div>
  )
}
