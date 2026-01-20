import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'sonner';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handlePricingClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.info(t('auth.loginRequired'));
      navigate('/auth');
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold gradient-text">ViralGen</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.features')}
          </a>
          <a 
            href="#pricing" 
            onClick={handlePricingClick}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('nav.pricing')}
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'tr' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm font-medium"
          >
            <Globe className="w-4 h-4" />
            {language.toUpperCase()}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-primary" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
                  {t('nav.freePlan')}
                </span>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">{t('nav.dashboard')}</Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost" size="sm">{t('nav.login')}</Button>
              </Link>
              <Link to="/auth?signup=true">
                <Button size="sm" className="btn-gradient text-white">{t('nav.getStarted')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
