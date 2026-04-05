// src/hooks/useSteps.js
// Handles step CRUD for a given project

import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { db } from '../db'

export function useSteps(projectId) {
  const [steps, setSteps] = useState([])

  // Reload steps whenever the selected project changes
  useEffect(() => {
    if (!projectId) {
      setSteps([])
      return
    }
    const load = async () => {
      const all = await db.steps
        .where('projectId')
        .equals(projectId)
        .sortBy('order')
      setSteps(all)
    }
    load()
  }, [projectId])

  const addStep = async (title) => {
    if (!title.trim() || !projectId) return
    const step = {
      id: uuid(),
      projectId,
      title: title.trim(),
      order: steps.length, // append at end
    }
    await db.steps.add(step)
    setSteps((prev) => [...prev, step])
  }

  const deleteStep = async (stepId) => {
    // Cascade: remove tasks inside the step
    await db.tasks.where('stepId').equals(stepId).delete()
    await db.steps.delete(stepId)
    setSteps((prev) => prev.filter((s) => s.id !== stepId))
  }

  return { steps, addStep, deleteStep }
}
