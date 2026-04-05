// src/components/StepCard.jsx
// A single step section with its tasks and inline add-task form

import { useState } from 'react'
import { TaskItem } from './TaskItem'

export function StepCard({ step, tasks, onAddTask, onToggleTask, onDeleteTask, onDeleteStep }) {
  const [input, setInput] = useState('')
  const [addingTask, setAddingTask] = useState(false)

  const completedCount = tasks.filter((t) => t.completed).length
  const total = tasks.length

  const handleAddTask = () => {
    if (!input.trim()) return
    onAddTask(step.id, input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTask()
    if (e.key === 'Escape') {
      setAddingTask(false)
      setInput('')
    }
  }

  return (
    <div className="bg-white border border-stone-100 rounded-xl p-5 shadow-sm">
      {/* Step header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-medium text-stone-800 leading-tight">{step.title}</h3>
          {total > 0 && (
            <p className="text-xs text-stone-400 mt-0.5 font-mono">
              {completedCount}/{total} done
            </p>
          )}
        </div>
        <button
          onClick={() => onDeleteStep(step.id)}
          className="text-stone-200 hover:text-red-400 text-xs transition-colors mt-0.5"
          title="Delete step"
        >
          ✕
        </button>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-0.5 bg-stone-100 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-stone-800 rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-0.5">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      {/* Add task inline */}
      <div className="mt-3">
        {addingTask ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              className="flex-1 text-sm px-3 py-1.5 rounded-lg border border-stone-200 focus:outline-none focus:border-stone-400 bg-stone-50 placeholder:text-stone-300"
              placeholder="Task title…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!input.trim()) setAddingTask(false)
              }}
            />
            <button
              onClick={handleAddTask}
              className="text-xs px-3 py-1.5 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingTask(true)}
            className="text-xs text-stone-400 hover:text-stone-600 transition-colors flex items-center gap-1"
          >
            <span>+</span> Add task
          </button>
        )}
      </div>
    </div>
  )
}
