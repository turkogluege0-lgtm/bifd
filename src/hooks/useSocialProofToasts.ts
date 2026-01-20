import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

const countries = ['USA', 'UK', 'Germany', 'Brazil', 'France', 'Canada', 'Australia', 'Japan', 'India', 'Turkey'];
const contentTypes = ['Reddit Story', 'AI Drama', 'Side Hustle', 'Uncanny Story', 'Viral Script'];

const getRandomCountry = () => countries[Math.floor(Math.random() * countries.length)];
const getRandomContent = () => contentTypes[Math.floor(Math.random() * contentTypes.length)];

export const useSocialProofToasts = (enabled: boolean = true) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Show first toast after 15-25 seconds
    const initialDelay = Math.random() * 10000 + 15000;
    
    const showRandomToast = () => {
      const country = getRandomCountry();
      const content = getRandomContent();
      
      const messages = [
        `🚀 Someone from ${country} just went viral with a ${content}!`,
        `✨ A creator from ${country} just generated a ${content}!`,
        `🎉 User from ${country} upgraded to Pro Studio!`,
        `💎 New viral hit from ${country} - ${content}!`,
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      toast(randomMessage, {
        duration: 4000,
        className: 'social-proof-toast',
        position: 'bottom-left',
      });
    };

    const timeout = setTimeout(() => {
      showRandomToast();
      
      // Then show every 20-40 seconds
      intervalRef.current = setInterval(() => {
        showRandomToast();
      }, Math.random() * 20000 + 20000);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled]);
};
