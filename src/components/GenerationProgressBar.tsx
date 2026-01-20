import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GenerationProgressBarProps {
  progress: number;
  isActive: boolean;
  onComplete?: () => void;
}

// Status messages that cycle every 6 seconds
const STATUS_MESSAGES = [
  'progress.status1', // Extracting viral hooks from trending Reddit threads...
  'progress.status2', // Generating AI-powered Brainrot script for maximum retention...
  'progress.status3', // Fetching high-speed Subway Surfers & Minecraft parkour backgrounds...
  'progress.status4', // Synthesizing high-energy AI voice-over (ElevenLabs quality)...
  'progress.status5', // Applying dynamic 'TikTok-style' auto-captions...
  'progress.status6', // Deep-frying audio and adding trending background music...
  'progress.status7', // Optimizing video metadata for YT Shorts & TikTok algorithms...
  'progress.status8', // Finalizing your viral masterpiece...
];

// Get queue position and wait time based on progress
const getQueueInfo = (progress: number) => {
  if (progress < 25) return { position: Math.floor(12 + Math.random() * 5), waitTime: '4 mins' };
  if (progress < 50) return { position: 9, waitTime: '3 mins' };
  if (progress < 75) return { position: 5, waitTime: '2 mins' };
  if (progress < 95) return { position: 2, waitTime: '1 min' };
  return { position: 1, waitTime: 'Seconds away...' };
};

export const GenerationProgressBar = ({ progress, isActive, onComplete }: GenerationProgressBarProps) => {
  const { t } = useLanguage();
  const [statusIndex, setStatusIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Cycle status messages every 6 seconds
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Update status index based on progress (for proper timing)
  useEffect(() => {
    if (!isActive) return;
    
    // Calculate which status should show based on progress
    const progressBasedIndex = Math.min(
      Math.floor((progress / 100) * STATUS_MESSAGES.length),
      STATUS_MESSAGES.length - 1
    );
    setStatusIndex(progressBasedIndex);
  }, [progress, isActive]);

  // Handle completion
  useEffect(() => {
    if (progress >= 100 && isActive) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        onComplete?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [progress, isActive, onComplete]);

  if (!isActive && !showSuccess) return null;

  const queueInfo = getQueueInfo(progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-card p-6 rounded-2xl border border-brand-cyan/30">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
              <h3 className="text-xl font-bold text-green-400 mb-2">{t('progress.success')}</h3>
              <p className="text-sm text-muted-foreground">{t('progress.successMessage')}</p>
            </motion.div>
          ) : (
            <motion.div key="progress">
              {/* Generating text */}
              <motion.p
                className="text-center text-brand-cyan font-semibold mb-3 text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t('generatingVideo')}
              </motion.p>

              {/* Queue Position & Wait Time */}
              <div className="flex justify-center gap-6 mb-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('progress.queuePosition')}</p>
                  <motion.p
                    key={queueInfo.position}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-brand-cyan"
                  >
                    {queueInfo.position === 1 ? '🥇 1st' : `#${queueInfo.position}`}
                  </motion.p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">{t('progress.waitTime')}</p>
                  <motion.p
                    key={queueInfo.waitTime}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-brand-purple"
                  >
                    {queueInfo.waitTime}
                  </motion.p>
                </div>
              </div>

              {/* Percentage display */}
              <div className="text-center mb-4">
                <motion.span
                  className="text-5xl font-bold text-white"
                  key={Math.floor(progress)}
                >
                  {Math.floor(progress)}
                </motion.span>
                <span className="text-3xl font-bold text-brand-cyan">%</span>
              </div>

              {/* Progress bar container */}
              <div className="relative h-4 bg-background/50 rounded-full overflow-hidden border border-brand-cyan/20">
                {/* Glow effect behind bar */}
                <motion.div
                  className="absolute inset-0 blur-md bg-brand-cyan/30"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Main progress bar */}
                <motion.div
                  className="absolute h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, hsl(var(--brand-cyan)) 0%, hsl(var(--brand-purple)) 100%)',
                    boxShadow: '0 0 20px hsl(var(--brand-cyan) / 0.5), 0 0 40px hsl(var(--brand-cyan) / 0.3)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute h-full w-20 top-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    left: `${progress - 10}%`
                  }}
                  animate={{
                    left: ['0%', `${progress}%`]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>

              {/* Status Message Feed */}
              <div className="mt-4 min-h-[40px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-sm text-brand-cyan/80 font-medium"
                  >
                    {t(STATUS_MESSAGES[statusIndex])}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Subtle pulsing dots */}
              <div className="flex justify-center gap-2 mt-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-brand-cyan"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
