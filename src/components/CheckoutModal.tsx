import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulated checkout
    setTimeout(() => {
      setLoading(false);
      toast.success('This is a demo checkout. Payment integration coming soon!');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-card dark:glass-card glass-card-light p-8 m-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{t('checkout.title')}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Pro Studio</span>
                  <span className="text-2xl font-bold gradient-text">$19/mo</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t('checkout.card')}</label>
                  <div className="relative">
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      className="pl-10"
                      required
                    />
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.expiry')}</label>
                    <Input placeholder="MM/YY" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('checkout.cvc')}</label>
                    <Input placeholder="123" required />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-gradient text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    t('checkout.pay')
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  {t('checkout.secure')}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
