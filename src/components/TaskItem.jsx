// src/components/TaskItem.jsx
// Individual task row: toggle, title, delete

import { useState } from 'react'
import { Trash2, Check } from 'lucide-react'

export function TaskItem({ task, onToggle, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="flex items-center gap-3 py-2 px-1 rounded-lg hover:bg-gray-50 group transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-5 h-5 rounded-full shrink-0 border-2 transition-all flex items-center justify-center ${
          task.completed
            ? 'bg-brand-500 border-brand-500 text-white'
            : 'border-gray-300 hover:border-brand-400'
        }`}
      >
        {task.completed && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Title */}
      <span
        className={`text-sm flex-1 transition-colors leading-snug ${
          task.completed ? 'line-through text-gray-400' : 'text-gray-700'
        }`}
      >
        {task.title}
      </span>

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        className={`shrink-0 text-gray-300 hover:text-red-400 transition-all ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
        title="Delete task"
      >
        <Trash2 size={13} />
      </button>
    </div>
  )
}
