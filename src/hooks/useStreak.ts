import { useLocalStorage } from './useLocalStorage';
import { Streak } from '@/types';
import { useEffect } from 'react';

export function useStreak() {
  const [streak, setStreak] = useLocalStorage<Streak>('skillzbloom-streak', {
    count: 0,
    lastActive: '',
  });

  useEffect(() => {
    const today = new Date().toDateString();
    const lastActive = streak.lastActive ? new Date(streak.lastActive).toDateString() : '';
    
    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastActive === yesterday) {
        // Continue streak
        setStreak({ count: streak.count + 1, lastActive: new Date().toISOString() });
      } else if (lastActive === '') {
        // First time
        setStreak({ count: 1, lastActive: new Date().toISOString() });
      } else {
        // Streak broken
        setStreak({ count: 1, lastActive: new Date().toISOString() });
      }
    }
  }, []);

  return { streak };
}
