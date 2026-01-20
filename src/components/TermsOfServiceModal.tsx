import { motion, AnimatePresence } from 'framer-motion';
import { X, ScrollText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal = ({ isOpen, onClose }: TermsOfServiceModalProps) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 rounded-2xl border border-brand-purple/30 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                  <ScrollText className="w-5 h-5 text-brand-purple" />
                </div>
                <h2 className="text-xl font-bold">{t('terms.title')}</h2>
              </div>

              {/* Content */}
              <div className="space-y-6 text-sm">
                <section>
                  <h3 className="font-semibold text-foreground mb-2">{t('terms.section1.title')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t('terms.section1.content')}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">{t('terms.section2.title')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t('terms.section2.content')}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">{t('terms.section3.title')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t('terms.section3.content')}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">{t('terms.section4.title')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t('terms.section4.content')}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-foreground mb-2">{t('terms.section5.title')}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t('terms.section5.content')}</p>
                </section>

                <p className="text-xs text-muted-foreground border-t border-border/50 pt-4">
                  {t('terms.lastUpdated')}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
