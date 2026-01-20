import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CREDITS_KEY = 'viralgen-credits';
const MAX_CREDITS = 2;

export const useCredits = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(MAX_CREDITS);

  const getStorageKey = useCallback(() => {
    if (!user) return null;
    return `${CREDITS_KEY}-${user.id}`;
  }, [user]);

  useEffect(() => {
    const key = getStorageKey();
    if (key) {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        setCredits(parseInt(saved, 10));
      } else {
        setCredits(MAX_CREDITS);
        localStorage.setItem(key, MAX_CREDITS.toString());
      }
    }
  }, [getStorageKey]);

  const useCredit = useCallback(() => {
    const key = getStorageKey();
    if (!key) return false;
    
    if (credits > 0) {
      const newCredits = credits - 1;
      setCredits(newCredits);
      localStorage.setItem(key, newCredits.toString());
      return true;
    }
    return false;
  }, [credits, getStorageKey]);

  const hasCredits = credits > 0;

  return {
    credits,
    maxCredits: MAX_CREDITS,
    hasCredits,
    useCredit,
  };
};
