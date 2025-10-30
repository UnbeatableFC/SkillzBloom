import { useLocalStorage } from './useLocalStorage';
import { Skill } from '@/types';
import { mockSkills } from '@/lib/mockData';

export function useSkills() {
  const [skills, setSkills] = useLocalStorage<Skill[]>('skillzbloom-skills', mockSkills);

  const addSkill = (skill: Omit<Skill, 'id' | 'createdAt'>) => {
    const newSkill: Skill = {
      ...skill,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills(skills.map(skill => skill.id === id ? { ...skill, ...updates } : skill));
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return { skills, addSkill, updateSkill, deleteSkill };
}
