import { motion } from 'framer-motion';
import { Users, Sparkles, TrendingUp, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export const TrustBar = () => {
  const [creatorsOnline, setCreatorsOnline] = useState(1482);

  // Simulate live creators online count
  useEffect(() => {
    const interval = setInterval(() => {
      setCreatorsOnline(prev => {
        const change = Math.floor(Math.random() * 20) - 10;
        return Math.max(1200, Math.min(1800, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-premium p-4 rounded-2xl border border-border/30 mb-8"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
        {/* Live Creators Online */}
        <motion.div 
          className="flex items-center gap-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-green-500" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-green-500">{creatorsOnline.toLocaleString()}</span> Creators Online
          </p>
        </motion.div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border/50" />

        {/* Trusted by */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">
            Trusted by <span className="font-bold text-foreground">10,000+</span> Creators
          </p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border/50" />

        {/* Videos Generated */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">142,892+</span> Videos Generated
          </p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-8 bg-border/50" />

        {/* Trending */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">#1</span> AI Video Tool
          </p>
        </div>
      </div>
    </motion.div>
  );
};
