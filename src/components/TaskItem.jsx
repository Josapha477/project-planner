// src/components/TaskItem.jsx
// Individual task row: toggle, title, delete

import { useState } from 'react'

export function TaskItem({ task, onToggle, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex items-center gap-3 py-1.5 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-4 h-4 rounded shrink-0 border transition-colors flex items-center justify-center ${
          task.completed
            ? 'bg-stone-800 border-stone-800 text-white'
            : 'border-stone-300 hover:border-stone-500'
        }`}
      >
        {task.completed && (
          <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
            <path
              d="M1 4l3 3 5-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Title */}
      <span
        className={`text-sm flex-1 transition-colors ${
          task.completed ? 'line-through text-stone-400' : 'text-stone-700'
        }`}
      >
        {task.title}
      </span>

      {/* Delete */}
      {hovered && (
        <button
          onClick={() => onDelete(task.id)}
          className="text-stone-300 hover:text-red-400 text-xs transition-colors"
          title="Delete task"
        >
          ✕
        </button>
      )}
    </div>
  )
}
