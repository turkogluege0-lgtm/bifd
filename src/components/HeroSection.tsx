import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const HeroSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartFree = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth?signup=true');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_70%)]" />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Content Generation</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')}{' '}
            <span className="gradient-text">{t('hero.titleHighlight')}</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="btn-gradient text-white px-8 py-6 text-lg group"
              onClick={handleStartFree}
            >
              {t('hero.startFree')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="#features">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg neon-border">
                {t('hero.learnMore')}
              </Button>
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '10K+', label: 'Users' },
              { value: '1M+', label: 'Generated' },
              { value: '99%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
