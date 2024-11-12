import { create } from 'zustand';

import { Task } from '@/types/task';

type TaskStatus = 'todo' | 'in-progress' | 'completed';
type Priority = 'low' | 'medium' | 'high';

interface TaskState {
  tasks: Task[];
  filter: {
    status?: TaskStatus;
    priority?: Priority;
    tags?: string[];
  };
  view: 'list' | 'board';
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: Partial<TaskState['filter']>) => void;
  toggleView: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: {},
  view: 'list',
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),
  toggleView: () =>
    set((state) => ({
      view: state.view === 'list' ? 'board' : 'list',
    })),
}));
