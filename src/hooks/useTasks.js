// src/hooks/useTasks.js
// Handles task CRUD for all steps in the current project

import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { db } from '../db'

export function useTasks(stepIds) {
  const [tasks, setTasks] = useState([])

  // Reload tasks when the list of steps changes
  useEffect(() => {
    if (!stepIds || stepIds.length === 0) {
      setTasks([])
      return
    }
    const load = async () => {
      const all = await db.tasks.where('stepId').anyOf(stepIds).toArray()
      // Sort by creation date within each step
      all.sort((a, b) => a.createdAt - b.createdAt)
      setTasks(all)
    }
    load()
  }, [JSON.stringify(stepIds)])

  const addTask = async (stepId, title) => {
    if (!title.trim() || !stepId) return
    const task = {
      id: uuid(),
      stepId,
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    }
    await db.tasks.add(task)
    setTasks((prev) => [...prev, task])
  }

  const toggleTask = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    const updated = { ...task, completed: !task.completed }
    await db.tasks.put(updated)
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)))
  }

  const deleteTask = async (taskId) => {
    await db.tasks.delete(taskId)
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
  }

  // Helper: get tasks for a specific step
  const getTasksForStep = (stepId) => tasks.filter((t) => t.stepId === stepId)

  return { tasks, addTask, toggleTask, deleteTask, getTasksForStep }
}
