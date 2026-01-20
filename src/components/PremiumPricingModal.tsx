import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Check, Zap, Shield, Clock, Sparkles, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PremiumPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  message?: string;
}

const FEATURES = [
  { icon: Sparkles, label: 'Unlimited Generations' },
  { icon: Clock, label: 'Priority Render Queue' },
  { icon: Ban, label: 'No Watermark' },
  { icon: Zap, label: '4K Resolution Export' },
  { icon: Shield, label: 'Commercial License' },
];

export const PremiumPricingModal = ({ isOpen, onClose, onCheckout, message }: PremiumPricingModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative glass-card-premium max-w-md w-full p-8 rounded-3xl border border-primary/30 glow-purple"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Crown badge */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-purple"
            >
              <Crown className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2 gradient-text">
            ViralGen Pro Studio
          </h2>

          {/* Upgrade message */}
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-amber-500 text-sm mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
            >
              {message}
            </motion.p>
          )}

          {/* Price */}
          <div className="text-center mb-6">
            <span className="text-5xl font-bold gradient-text">$19</span>
            <span className="text-muted-foreground text-lg"> / month</span>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {FEATURES.map((feature, index) => (
              <motion.li
                key={feature.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">{feature.label}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onCheckout}
              className="w-full btn-gradient text-white text-lg py-6 font-semibold"
            >
              <Crown className="mr-2 w-5 h-5" />
              Unlock Pro Studio Now
            </Button>
          </motion.div>

          {/* Guarantee */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Cancel anytime. 7-day money-back guarantee.
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
