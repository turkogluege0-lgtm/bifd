import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { externalSupabase } from '@/lib/supabase';

type UserRole = 'admin' | 'user' | 'pro' | 'free';

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = useCallback(async () => {
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await externalSupabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching roles:', error);
        // Default to 'free' role for new users if no role exists
        setRoles(['free']);
      } else if (!data || data.length === 0) {
        // No roles found - user is free tier by default
        setRoles(['free']);
      } else {
        setRoles(data.map(r => r.role as UserRole));
      }
    } catch (err) {
      console.error('Error in fetchRoles:', err);
      setRoles(['free']);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const isAdmin = roles.includes('admin');
  const isPro = roles.includes('pro') || roles.includes('admin'); // Admins have pro access
  const isUser = roles.includes('user');
  const isFree = !isAdmin && !roles.includes('pro');

  return {
    roles,
    isAdmin,
    isPro,
    isUser,
    isFree,
    loading,
    refetch: fetchRoles,
  };
};
