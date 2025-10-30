import { useLocalStorage } from './useLocalStorage';
import { Reflection } from '@/types';
import { mockReflections } from '@/lib/mockData';

export function useReflections() {
  const [reflections, setReflections] = useLocalStorage<Reflection[]>('skillzbloom-reflections', mockReflections);

  const addReflection = (reflection: Omit<Reflection, 'id' | 'createdAt'>) => {
    const newReflection: Reflection = {
      ...reflection,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setReflections([newReflection, ...reflections]);
  };

  const deleteReflection = (id: string) => {
    setReflections(reflections.filter(r => r.id !== id));
  };

  return { reflections, addReflection, deleteReflection };
}
