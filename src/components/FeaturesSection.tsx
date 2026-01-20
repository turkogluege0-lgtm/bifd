import { motion } from 'framer-motion';
import { Sparkles, BarChart3, Zap, Layout } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  { icon: Sparkles, key: 'ai' },
  { icon: BarChart3, key: 'analytics' },
  { icon: Zap, key: 'speed' },
  { icon: Layout, key: 'templates' },
];

export const FeaturesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-xl text-muted-foreground">{t('features.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card dark:glass-card glass-card-light p-6 group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-purple transition-all">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`features.${feature.key}.title`)}</h3>
                <p className="text-muted-foreground">{t(`features.${feature.key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
