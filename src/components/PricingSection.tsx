import { motion } from 'framer-motion';
import { Check, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface PricingSectionProps {
  onUpgrade?: () => void;
  isDashboard?: boolean;
}

export const PricingSection = ({ onUpgrade, isDashboard = false }: PricingSectionProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProClick = () => {
    if (!user) {
      toast.info(t('auth.loginRequired'));
      navigate('/auth');
      return;
    }
    onUpgrade?.();
  };

  const plans = [
    {
      name: t('pricing.free'),
      price: t('pricing.free.price'),
      period: t('pricing.free.period'),
      features: [
        t('pricing.free.feature1'),
        t('pricing.free.feature2'),
        t('pricing.free.feature3'),
      ],
      cta: t('pricing.free.cta'),
      popular: false,
    },
    {
      name: t('pricing.pro'),
      price: t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      features: [
        t('pricing.pro.feature1'),
        t('pricing.pro.feature2'),
        t('pricing.pro.feature3'),
        t('pricing.pro.feature4'),
      ],
      cta: t('pricing.pro.cta'),
      popular: true,
    },
  ];

  return (
    <section id="pricing" className={`${isDashboard ? 'py-12' : 'py-24'} relative`}>
      <div className="container mx-auto px-4">
        {!isDashboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('pricing.title')}</h2>
            <p className="text-xl text-muted-foreground">{t('pricing.subtitle')}</p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative glass-card dark:glass-card glass-card-light p-8 ${
                plan.popular ? 'neon-border glow-purple' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.popular ? 'btn-gradient text-white' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={plan.popular ? handleProClick : undefined}
                disabled={!plan.popular}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
