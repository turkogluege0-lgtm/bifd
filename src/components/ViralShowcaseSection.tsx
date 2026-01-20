import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const videos = [
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2000.49.31%20(1)%20(1).mp4',
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2000.49.31%20(2).mp4',
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2000.49.31%20(3).mp4',
  'https://xwnvzjpdbvtoavsufclp.supabase.co/storage/v1/object/public/videos/WhatsApp%20Video%202026-01-11%20at%2000.49.31.mp4',
];

export const ViralShowcaseSection = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">
              {t('showcase.badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('showcase.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('showcase.subtitle')}
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {videos.map((videoUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`relative rounded-2xl overflow-hidden ${theme === 'dark' ? 'video-glow' : 'video-glow-light'}`}>
                {/* Glowing border effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm" />
                
                <div className="relative rounded-2xl overflow-hidden bg-background">
                  <video
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-[9/16] object-cover"
                  />
                  
                  {/* Overlay with play icon on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <div className="flex items-center gap-2 text-primary">
                      <Play className="w-5 h-5 fill-current" />
                      <span className="font-medium">{t('showcase.viral')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
