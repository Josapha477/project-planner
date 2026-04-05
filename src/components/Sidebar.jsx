// src/components/Sidebar.jsx
// Left panel: project list + create project

import { useState } from 'react'

export function Sidebar({ projects, selectedId, onSelect, onCreate, onDelete }) {
  const [input, setInput] = useState('')
  const [adding, setAdding] = useState(false)

  const handleCreate = async () => {
    if (!input.trim()) return
    const project = await onCreate(input)
    if (project) onSelect(project.id)
    setInput('')
    setAdding(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCreate()
    if (e.key === 'Escape') {
      setAdding(false)
      setInput('')
    }
  }

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-stone-100 flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-stone-100">
        <span className="font-mono text-xs tracking-widest text-stone-400 uppercase">
          Planner
        </span>
      </div>

      {/* Project list */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3">
        {projects.length === 0 && (
          <p className="px-5 text-xs text-stone-400 mt-2">No projects yet.</p>
        )}
        {projects.map((p) => (
          <ProjectItem
            key={p.id}
            project={p}
            selected={p.id === selectedId}
            onSelect={() => onSelect(p.id)}
            onDelete={() => onDelete(p.id)}
          />
        ))}
      </nav>

      {/* Add project area */}
      <div className="p-3 border-t border-stone-100">
        {adding ? (
          <input
            autoFocus
            className="w-full text-sm px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:border-stone-400 bg-stone-50 placeholder:text-stone-300"
            placeholder="Project name…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (!input.trim()) setAdding(false)
            }}
          />
        ) : (
          <button
            onClick={() => setAdding(true)}
            className="w-full text-sm text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors px-3 py-2 rounded-lg text-left flex items-center gap-2"
          >
            <span className="text-base leading-none">+</span> New project
          </button>
        )}
      </div>
    </aside>
  )
}

// Single project row
function ProjectItem({ project, selected, onSelect, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`group flex items-center justify-between mx-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        selected
          ? 'bg-stone-800 text-white'
          : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'
      }`}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-sm truncate flex-1">{project.name}</span>
      {hovered && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className={`ml-1 text-xs transition-opacity ${
            selected ? 'text-stone-300 hover:text-white' : 'text-stone-300 hover:text-red-400'
          }`}
          title="Delete project"
        >
          ✕
        </button>
      )}
    </div>
  )
}
