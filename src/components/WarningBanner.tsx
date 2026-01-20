import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const WarningBanner = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 p-6 rounded-xl bg-destructive/10 border border-destructive/30"
    >
      <div className="flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 warning-glow" />
        <p className="text-sm md:text-base font-medium warning-glow animate-glow-pulse">
          {t('warning.text')}
        </p>
      </div>
    </motion.div>
  );
};
