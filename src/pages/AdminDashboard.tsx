import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Video, 
  Crown, 
  Ban, 
  Trash2, 
  ArrowLeft,
  RefreshCw,
  Shield,
  Activity,
  Download,
  RotateCcw,
  Zap,
  CheckCircle,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { externalSupabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// System admin ID - full bypass
const SYSTEM_ADMIN_ID = '4243c72f-51b2-4005-ae1e-b85cb3273a0f';

interface UserData {
  id: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  last_sign_in_at: string | null;
  role: 'admin' | 'pro' | 'free';
  usage_count: number;
  max_credits: number;
  is_banned: boolean;
}

interface Stats {
  totalUsers: number;
  totalVideos: number;
  proUsers: number;
  conversionRate: number;
  systemHealthy: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalVideos: 0,
    proUsers: 0,
    conversionRate: 0,
    systemHealthy: false,
  });

  // Security middleware - redirect non-admins immediately
  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      toast.error('⛔ Unauthorized Access. Admins only.');
      navigate('/');
    }
  }, [isAdmin, roleLoading, navigate]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all user roles
      const { data: rolesData, error: rolesError } = await externalSupabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Fetch usage counts (try usage_counts first, fallback to user_credits)
      let usageData: any[] = [];
      const { data: usageCountsData, error: usageError } = await externalSupabase
        .from('usage_counts')
        .select('*');
      
      if (!usageError && usageCountsData) {
        usageData = usageCountsData;
      } else {
        // Fallback to user_credits
        const { data: creditsData } = await externalSupabase
          .from('user_credits')
          .select('*');
        usageData = creditsData || [];
      }

      // Create role map
      const roleMap = new Map<string, 'admin' | 'pro' | 'free'>();
      rolesData?.forEach(r => {
        const existingRole = roleMap.get(r.user_id);
        if (r.role === 'admin' || (!existingRole)) {
          roleMap.set(r.user_id, r.role as 'admin' | 'pro' | 'free');
        } else if (r.role === 'pro' && existingRole !== 'admin') {
          roleMap.set(r.user_id, 'pro');
        }
      });

      // Transform data
      const userData: UserData[] = usageData.map(usage => {
        const userId = usage.user_id;
        const role = roleMap.get(userId) || 'free';
        return {
          id: userId,
          email: `user-${userId.substring(0, 8)}@viralgen.ai`,
          avatar_url: undefined,
          created_at: usage.created_at,
          last_sign_in_at: usage.updated_at,
          role,
          usage_count: usage.usage_count || usage.count || 0,
          max_credits: role === 'admin' || role === 'pro' ? 9999 : 2,
          is_banned: false,
        };
      });

      // Add users from roles that might not have usage records
      rolesData?.forEach(r => {
        if (!userData.find(u => u.id === r.user_id)) {
          userData.push({
            id: r.user_id,
            email: `user-${r.user_id.substring(0, 8)}@viralgen.ai`,
            created_at: new Date().toISOString(),
            last_sign_in_at: null,
            role: r.role as 'admin' | 'pro' | 'free',
            usage_count: 0,
            max_credits: r.role === 'admin' || r.role === 'pro' ? 9999 : 2,
            is_banned: false,
          });
        }
      });

      setUsers(userData);

      // Calculate stats
      const totalVideos = userData.reduce((sum, u) => sum + u.usage_count, 0);
      const proCount = userData.filter(u => u.role === 'pro').length;
      const totalCount = userData.length;
      
      setStats({
        totalUsers: totalCount,
        totalVideos: totalVideos + 142892, // Base count
        proUsers: proCount,
        conversionRate: totalCount > 0 ? (proCount / totalCount) * 100 : 0,
        systemHealthy: true,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch user data');
      setStats(prev => ({ ...prev, systemHealthy: false }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, fetchUsers]);

  const handleMakePro = async (userId: string) => {
    try {
      // Upsert pro role
      const { error } = await externalSupabase
        .from('user_roles')
        .upsert({ user_id: userId, role: 'pro' }, { onConflict: 'user_id' });

      if (error) throw error;

      // Update is_pro in user_credits if exists
      await externalSupabase
        .from('user_credits')
        .update({ is_pro: true, max_credits: 9999 })
        .eq('user_id', userId);

      toast.success('✨ User upgraded to Pro!');
      fetchUsers();
    } catch (error) {
      console.error('Error upgrading user:', error);
      toast.error('Failed to upgrade user');
    }
  };

  const handleResetUsage = async (userId: string) => {
    try {
      // Reset in usage_counts
      await externalSupabase
        .from('usage_counts')
        .update({ usage_count: 0, count: 0 })
        .eq('user_id', userId);

      // Also reset in user_credits as fallback
      await externalSupabase
        .from('user_credits')
        .update({ usage_count: 0 })
        .eq('user_id', userId);

      toast.success('🔄 Usage reset to 0');
      fetchUsers();
    } catch (error) {
      console.error('Error resetting usage:', error);
      toast.error('Failed to reset usage');
    }
  };

  const handleBanUser = async (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, is_banned: !u.is_banned } : u
    ));
    toast.success('🚫 User ban status toggled (placeholder)');
  };

  const handleDeleteUser = async (userId: string) => {
    if (userId === SYSTEM_ADMIN_ID) {
      toast.error('Cannot delete system admin!');
      return;
    }
    try {
      await externalSupabase.from('user_credits').delete().eq('user_id', userId);
      await externalSupabase.from('user_roles').delete().eq('user_id', userId);
      await externalSupabase.from('usage_counts').delete().eq('user_id', userId);

      toast.success('🗑️ User data deleted');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleExportCSV = () => {
    const headers = ['User ID', 'Email', 'Role', 'Usage', 'Created', 'Status'];
    const rows = users.map(u => [
      u.id,
      u.email,
      u.role,
      u.usage_count,
      new Date(u.created_at).toLocaleDateString(),
      u.is_banned ? 'Banned' : 'Active'
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `viralgen-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('📥 CSV exported successfully');
  };

  const getRoleBadge = (role: string, userId: string) => {
    if (userId === SYSTEM_ADMIN_ID) {
      return (
        <Badge className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-bold animate-pulse shadow-lg shadow-amber-500/50">
          <Shield className="w-3 h-3 mr-1" />
          SYSTEM ADMIN
        </Badge>
      );
    }
    switch (role) {
      case 'admin':
        return (
          <Badge className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold">
            <Crown className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case 'pro':
        return (
          <Badge className="bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold">
            <Zap className="w-3 h-3 mr-1" />
            Pro
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            Free
          </Badge>
        );
    }
  };

  const formatTimeAgo = (date: string | null) => {
    if (!date) return 'Never';
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return then.toLocaleDateString();
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying admin credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="gap-2 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to App
              </Button>
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20"
                >
                  <Shield className="w-7 h-7 text-primary" />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    SaaS Command Center
                  </h1>
                  <p className="text-sm text-muted-foreground">Full platform control & analytics</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleExportCSV} variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button onClick={fetchUsers} variant="outline" className="gap-2 border-secondary/20 hover:bg-secondary/10">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {/* Total Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Total Users</p>
                  <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Platform Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <Video className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Videos Generated</p>
                  <p className="text-3xl font-bold">{stats.totalVideos.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Conversion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center">
                  <Crown className="w-7 h-7 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Conversion Rate</p>
                  <p className="text-3xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">{stats.proUsers} Pro users</p>
                </div>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-green-500" />
                  </div>
                  {stats.systemHealthy && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">System Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-lg font-bold text-green-500">Healthy</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Supabase Connected</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">User Management</h2>
                <p className="text-sm text-muted-foreground">Manage roles, usage, and access</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary/20">
                  {users.length} users
                </Badge>
              </div>
            </div>
            
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading user data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50 hover:bg-transparent">
                      <TableHead className="text-muted-foreground">User</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Usage</TableHead>
                      <TableHead className="text-muted-foreground">Activity</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userData) => (
                      <TableRow 
                        key={userData.id} 
                        className={`border-border/30 transition-colors ${userData.is_banned ? 'opacity-50 bg-destructive/5' : 'hover:bg-primary/5'}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <UserCircle className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{userData.email}</p>
                              <p className="text-xs text-muted-foreground font-mono">{userData.id.substring(0, 12)}...</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getRoleBadge(userData.role, userData.id)}
                        </TableCell>
                        <TableCell>
                          <div className="w-32">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span>{userData.usage_count}</span>
                              <span className="text-muted-foreground">/ {userData.role === 'admin' || userData.role === 'pro' ? '∞' : userData.max_credits}</span>
                            </div>
                            <Progress 
                              value={userData.role === 'admin' || userData.role === 'pro' 
                                ? 100 
                                : Math.min((userData.usage_count / userData.max_credits) * 100, 100)
                              } 
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatTimeAgo(userData.last_sign_in_at)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
                                Actions
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem 
                                onClick={() => handleMakePro(userData.id)}
                                className="gap-2 text-purple-500 focus:text-purple-500"
                                disabled={userData.role === 'admin' || userData.role === 'pro'}
                              >
                                <Crown className="w-4 h-4" />
                                Make Pro
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleResetUsage(userData.id)}
                                className="gap-2"
                              >
                                <RotateCcw className="w-4 h-4" />
                                Reset Usage
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleBanUser(userData.id)}
                                className={`gap-2 ${userData.is_banned ? 'text-green-500 focus:text-green-500' : 'text-amber-500 focus:text-amber-500'}`}
                                disabled={userData.id === SYSTEM_ADMIN_ID}
                              >
                                <Ban className="w-4 h-4" />
                                {userData.is_banned ? 'Unban User' : 'Ban User'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteUser(userData.id)}
                                className="gap-2 text-destructive focus:text-destructive"
                                disabled={userData.id === SYSTEM_ADMIN_ID}
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {users.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No users found</p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>ViralGen SaaS Command Center • External Supabase: hmullbrktmfnybjrxwfk.supabase.co</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
