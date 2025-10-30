import { Task, Reflection, Skill, AiTip } from '@/types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Practice React hooks for 30 minutes',
    skill: 'React',
    dueDate: new Date().toISOString(),
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Read 2 chapters of design patterns book',
    skill: 'Software Design',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
];

export const mockReflections: Reflection[] = [
  {
    id: '1',
    text: 'Today I learned about useEffect hooks and how they help manage side effects. Feeling accomplished!',
    mood: 'great',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    level: 2,
    targetLevel: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'TypeScript',
    level: 1,
    targetLevel: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Software Design',
    level: 1,
    targetLevel: 4,
    createdAt: new Date().toISOString(),
  },
];

export function getMockAiTips(): AiTip[] {
  const tips = [
    {
      id: '1',
      title: 'Break down large tasks',
      description: 'Split your "Learn React" goal into smaller, 20-minute daily practice sessions.',
    },
    {
      id: '2',
      title: 'Focus on one skill at a time',
      description: 'Master TypeScript basics before diving into advanced patterns.',
    },
    {
      id: '3',
      title: 'Practice active recall',
      description: 'After reading, write a brief summary without looking at your notes.',
    },
    {
      id: '4',
      title: 'Set specific goals',
      description: 'Instead of "get better at coding", try "complete 3 algorithm challenges this week".',
    },
    {
      id: '5',
      title: 'Reflect regularly',
      description: 'Take 5 minutes each evening to note what you learned and what clicked.',
    },
    {
      id: '6',
      title: 'Build real projects',
      description: 'Apply your skills to a personal project you care about for better retention.',
    },
  ];

  // Return 3 random tips
  const shuffled = [...tips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}
