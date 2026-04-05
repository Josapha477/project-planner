// src/components/StepCard.jsx
// A single step section with its tasks and inline add-task form

import { useState } from 'react'
import { Trash2, Plus, ListTodo } from 'lucide-react'
import { TaskItem } from './TaskItem'

export function StepCard({ step, tasks, onAddTask, onToggleTask, onDeleteTask, onDeleteStep }) {
  const [input, setInput] = useState('')
  const [addingTask, setAddingTask] = useState(false)
  const [hoveringHeader, setHoveringHeader] = useState(false)

  const completedCount = tasks.filter((t) => t.completed).length
  const total = tasks.length
  const progress = total > 0 ? (completedCount / total) * 100 : 0
  const allDone = total > 0 && completedCount === total

  const handleAddTask = () => {
    if (!input.trim()) return
    onAddTask(step.id, input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTask()
    if (e.key === 'Escape') { setAddingTask(false); setInput('') }
  }

  return (
    <div className={`bg-white border rounded-xl overflow-hidden shadow-sm transition-all ${
      allDone ? 'border-brand-200' : 'border-gray-100'
    }`}>
      {/* Step header */}
      <div
        className={`px-5 pt-4 pb-3 flex items-center justify-between border-b ${
          allDone ? 'bg-brand-50 border-brand-100' : 'bg-gray-50 border-gray-100'
        }`}
        onMouseEnter={() => setHoveringHeader(true)}
        onMouseLeave={() => setHoveringHeader(false)}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <ListTodo size={16} className={allDone ? 'text-brand-500 shrink-0' : 'text-gray-400 shrink-0'} />
          <h3 className={`font-semibold text-sm truncate ${allDone ? 'text-brand-700' : 'text-gray-800'}`}>
            {step.title}
          </h3>
          {total > 0 && (
            <span className={`text-xs font-mono px-2 py-0.5 rounded-full shrink-0 ${
              allDone ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-500'
            }`}>
              {completedCount}/{total}
            </span>
          )}
        </div>
        <button
          onClick={() => onDeleteStep(step.id)}
          className={`shrink-0 ml-2 transition-all text-gray-300 hover:text-red-400 hover:bg-red-50 rounded p-1 ${
            hoveringHeader ? 'opacity-100' : 'opacity-0'
          }`}
          title="Delete step"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="h-1 bg-gray-100">
          <div
            className={`h-full transition-all duration-500 ${allDone ? 'bg-brand-500' : 'bg-brand-400'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Tasks */}
      <div className="px-4 pt-2 pb-1">
        {tasks.length === 0 && !addingTask && (
          <p className="text-xs text-gray-400 py-3 text-center">No tasks yet — add one below.</p>
        )}
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      {/* Add task */}
      <div className="px-4 pb-4 pt-1">
        {addingTask ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder:text-gray-300 transition"
              placeholder="Task title…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => { if (!input.trim()) setAddingTask(false) }}
            />
            <button
              onClick={handleAddTask}
              className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingTask(true)}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-600 transition-colors font-medium"
          >
            <Plus size={13} /> Add task
          </button>
        )}
      </div>
    </div>
  )
}
