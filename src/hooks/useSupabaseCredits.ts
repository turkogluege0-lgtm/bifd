import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";

const MAX_CREDITS = 2;

export const useSupabaseCredits = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(MAX_CREDITS);
  const [loading, setLoading] = useState(true);

  const fetchCredits = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setCredits(data?.credits ?? 0);
    } catch (err) {
      console.error('Error fetching credits:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const useCredit = useCallback(async (): Promise<boolean> => {
    if (!user || credits <= 0) return false;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ credits: credits - 1 })
        .eq('id', user.id);

      if (error) throw error;
      
      setCredits(prev => prev - 1);
      return true;
    } catch (err) {
      console.error('Error in useCredit:', err);
      return false;
    }
  }, [user, credits]);

  const hasCredits = credits > 0;

  return {
    credits,
    maxCredits: MAX_CREDITS,
    hasCredits,
    useCredit,
    loading,
    refetch: fetchCredits
  };
};