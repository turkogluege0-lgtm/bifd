import { useState, useEffect, useCallback } from 'react';

const TIMER_KEY = 'viralgen-timer-end';
const TIMER_DURATION = 60; // 60 seconds

export const useGenerationTimer = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const checkTimer = useCallback(() => {
    const savedEndTime = localStorage.getItem(TIMER_KEY);
    if (savedEndTime) {
      const endTime = parseInt(savedEndTime, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
      
      if (remaining > 0) {
        setRemainingTime(remaining);
        setIsActive(true);
      } else {
        localStorage.removeItem(TIMER_KEY);
        setRemainingTime(0);
        setIsActive(false);
      }
    }
  }, []);

  useEffect(() => {
    // Check on mount
    checkTimer();

    // Update every second
    const interval = setInterval(() => {
      checkTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [checkTimer]);

  const startTimer = useCallback(() => {
    const endTime = Date.now() + TIMER_DURATION * 1000;
    localStorage.setItem(TIMER_KEY, endTime.toString());
    setRemainingTime(TIMER_DURATION);
    setIsActive(true);
  }, []);

  return {
    remainingTime,
    isActive,
    startTimer,
  };
};
