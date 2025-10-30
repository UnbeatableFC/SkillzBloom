export type TaskStatus = 'todo' | 'done';

export interface Task {
  id: string;
  title: string;
  skill: string;
  dueDate: string;
  status: TaskStatus;
  createdAt: string;
}

export interface Reflection {
  id: string;
  text: string;
  mood: 'great' | 'good' | 'okay' | 'tough' | 'hard';
  date: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  targetLevel: number;
  createdAt: string;
}

export interface Streak {
  count: number;
  lastActive: string;
}

export interface AiTip {
  id: string;
  title: string;
  description: string;
}
