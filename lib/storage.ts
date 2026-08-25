import { Task } from './types'

const STORAGE_KEY = 'todo_tasks'

const DEMO_TASKS: Task[] = [
  {
    id: '1',
    title: 'Finish UX Research',
    description: 'Complete user interviews and analysis',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'high',
    category: 'work',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Complete Figma prototype',
    description: 'Design mobile app screens',
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    priority: 'high',
    category: 'work',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Prepare presentation',
    description: 'Prepare slides for client meeting',
    completed: false,
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    priority: 'medium',
    category: 'work',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Review design feedback',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    category: 'work',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Read AI Agent documentation',
    description: 'Study advanced AI patterns',
    completed: false,
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    priority: 'low',
    category: 'study',
    createdAt: new Date().toISOString(),
  },
]

export function getTasks(): Task[] {
  try {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : DEMO_TASKS
  } catch {
    return DEMO_TASKS
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save tasks:', error)
  }
}

export function addTask(task: Task): void {
  const tasks = getTasks()
  tasks.push(task)
  saveTasks(tasks)
}

export function updateTask(id: string, updates: Partial<Task>): void {
  const tasks = getTasks()
  const index = tasks.findIndex((t) => t.id === id)
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates }
    saveTasks(tasks)
  }
}

export function deleteTask(id: string): void {
  const tasks = getTasks()
  saveTasks(tasks.filter((t) => t.id !== id))
}

export function clearCompleted(): void {
  const tasks = getTasks()
  saveTasks(tasks.filter((t) => !t.completed))
}
