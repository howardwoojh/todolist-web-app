import { Task, Category, Priority } from './types'
import { format, isToday, isTomorrow, parseISO } from 'date-fns'

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'high':
      return 'text-red-500'
    case 'medium':
      return 'text-yellow-500'
    case 'low':
      return 'text-gray-400'
  }
}

export function getCategoryColor(category: Category): string {
  switch (category) {
    case 'work':
      return 'bg-blue-100 text-blue-700'
    case 'study':
      return 'bg-purple-100 text-purple-700'
    case 'personal':
      return 'bg-green-100 text-green-700'
    case 'other':
      return 'bg-gray-100 text-gray-700'
  }
}

export function formatDate(date: string): string {
  const parsed = parseISO(date)
  if (isToday(parsed)) return 'Today'
  if (isTomorrow(parsed)) return 'Tomorrow'
  return format(parsed, 'MMM d')
}

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
    if (priorityDiff !== 0) return priorityDiff
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
}

export function getTodayTasks(tasks: Task[]): Task[] {
  const today = new Date().toISOString().split('T')[0]
  return sortTasks(tasks.filter((t) => !t.completed && t.dueDate === today))
}

export function getUpcomingTasks(tasks: Task[]): Task[] {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  return tasks
    .filter((t) => !t.completed && t.dueDate && t.dueDate > todayStr)
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
}

export function getCompletedTasks(tasks: Task[]): Task[] {
  return tasks.filter((t) => t.completed)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
