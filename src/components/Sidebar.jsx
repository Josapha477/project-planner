// src/components/Sidebar.jsx
// Left panel — project list + create project
// Upwork-inspired green palette, lucide icons, responsive

import { useState } from 'react'
import { FolderOpen, Plus, Trash2, Briefcase, X } from 'lucide-react'

export function Sidebar({ projects, selectedId, onSelect, onCreate, onDelete, mobileOpen, onMobileClose }) {
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
    if (e.key === 'Escape') { setAdding(false); setInput('') }
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onMobileClose} />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-72 md:w-64 shrink-0
        bg-white border-r border-gray-100
        flex flex-col h-full
        transform transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <Briefcase size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Planner</span>
          </div>
          <button onClick={onMobileClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Section label */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Projects</span>
        </div>

        {/* Project list */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 space-y-0.5">
          {projects.length === 0 && (
            <div className="px-3 py-6 text-center">
              <FolderOpen size={28} className="text-gray-200 mx-auto mb-2" />
              <p className="text-xs text-gray-400">No projects yet.</p>
            </div>
          )}
          {projects.map((p) => (
            <ProjectItem
              key={p.id}
              project={p}
              selected={p.id === selectedId}
              onSelect={() => { onSelect(p.id); onMobileClose() }}
              onDelete={() => onDelete(p.id)}
            />
          ))}
        </nav>

        {/* Add project */}
        <div className="p-4 border-t border-gray-100">
          {adding ? (
            <div className="flex gap-2">
              <input
                autoFocus
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 placeholder:text-gray-300 transition"
                placeholder="Project name…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={() => { if (!input.trim()) setAdding(false) }}
              />
              <button
                onClick={handleCreate}
                className="px-3 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-gray-200 hover:border-brand-400 hover:bg-brand-50 text-gray-400 hover:text-brand-600 text-sm font-medium transition-all group"
            >
              <Plus size={16} className="group-hover:scale-110 transition-transform" />
              New project
            </button>
          )}
        </div>
      </aside>
    </>
  )
}

function ProjectItem({ project, selected, onSelect, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all group ${
        selected
          ? 'bg-brand-500 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FolderOpen size={15} className={selected ? 'text-white/80 shrink-0' : 'text-gray-400 shrink-0'} />
      <span className="text-sm font-medium truncate flex-1">{project.name}</span>
      {hovered && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          className={`shrink-0 transition-colors rounded p-0.5 ${
            selected ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-300 hover:text-red-400 hover:bg-red-50'
          }`}
          title="Delete project"
        >
          <Trash2 size={13} />
        </button>
      )}
    </div>
  )
}
