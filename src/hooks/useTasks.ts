import { useLocalStorage } from './useLocalStorage';
import { Task } from '@/types';
import { mockTasks } from '@/lib/mockData';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('skillzbloom-tasks', mockTasks);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'todo' ? 'done' : 'todo' } 
        : task
    ));
  };

  return { tasks, addTask, updateTask, deleteTask, toggleTaskStatus };
}
