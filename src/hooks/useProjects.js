// src/hooks/useProjects.js
// Handles all project-level operations with Dexie

import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { db } from '../db'

export function useProjects() {
  const [projects, setProjects] = useState([])

  // Load all projects on mount
  useEffect(() => {
    const load = async () => {
      const all = await db.projects.orderBy('createdAt').toArray()
      setProjects(all)
    }
    load()
  }, [])

  const createProject = async (name) => {
    if (!name.trim()) return null
    const project = {
      id: uuid(),
      name: name.trim(),
      createdAt: Date.now(),
    }
    await db.projects.add(project)
    setProjects((prev) => [...prev, project])
    return project
  }

  const deleteProject = async (projectId) => {
    // Cascade: delete steps and their tasks
    const steps = await db.steps.where('projectId').equals(projectId).toArray()
    const stepIds = steps.map((s) => s.id)

    await db.tasks.where('stepId').anyOf(stepIds).delete()
    await db.steps.where('projectId').equals(projectId).delete()
    await db.projects.delete(projectId)

    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }

  return { projects, createProject, deleteProject }
}
