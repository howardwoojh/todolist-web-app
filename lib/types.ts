export type Priority = 'low' | 'medium' | 'high'

export type Category = 'study' | 'work' | 'personal' | 'other'

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate?: string
  priority: Priority
  category: Category
  createdAt: string
}

export type Page = 'my-tasks' | 'today' | 'upcoming' | 'completed'
