import { motion, AnimatePresence } from 'framer-motion';
import { X, Handshake, DollarSign, Link, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnershipModal = ({ isOpen, onClose }: PartnershipModalProps) => {
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
            <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-brand-cyan/30 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted/50 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-brand-cyan" />
                </div>
                <h2 className="text-2xl font-bold gradient-text mb-2">{t('partnership.title')}</h2>
                <p className="text-sm text-muted-foreground">{t('partnership.subtitle')}</p>
              </div>

              {/* Benefits */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <DollarSign className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-400">{t('partnership.benefit1')}</p>
                    <p className="text-sm text-muted-foreground">{t('partnership.benefit1Desc')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20">
                  <Link className="w-5 h-5 text-brand-cyan mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-cyan">{t('partnership.benefit2')}</p>
                    <p className="text-sm text-muted-foreground">{t('partnership.benefit2Desc')}</p>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">{t('partnership.contact')}</p>
                <a
                  href="https://www.tiktok.com/@viralgenofficial?_r=1&_t=ZS-92zMbN3bwyw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="btn-gradient w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    {t('partnership.cta')}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
