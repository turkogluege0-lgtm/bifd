import { motion } from 'framer-motion';
import { Flame, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const dashboardVideos = [
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2013.10.46%20(1).mp4',
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2013.10.46.mp4',
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2013.10.46%20(2).mp4',
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2013.10.41.mp4',
];

export const ViralExamplesGrid = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Flame className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{t('examples.title')}</h2>
          <p className="text-sm text-muted-foreground">{t('examples.subtitle')}</p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardVideos.map((videoUrl, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="group relative"
          >
            <div className={`relative rounded-xl overflow-hidden ${theme === 'dark' ? 'glass-card' : 'glass-card-light'} p-1`}>
              {/* Glowing border on hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-accent/50 to-secondary/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              
              <div className="relative rounded-lg overflow-hidden bg-background">
                <video
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-[9/16] object-cover"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <div className="flex items-center gap-1.5 text-primary text-sm">
                    <Play className="w-4 h-4 fill-current" />
                    <span className="font-medium">{t('examples.viral')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
