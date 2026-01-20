import { motion } from 'framer-motion';
import { Mic, Lock, Sparkles, Gem } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface VoiceStyleSelectorProps {
  isPro: boolean;
  onVoiceChange: (voice: string) => void;
  onStyleChange: (style: string) => void;
  onUpgradeClick: () => void;
  selectedVoice: string;
  selectedStyle: string;
}

const VOICE_OPTIONS = [
  { id: 'deep', label: 'Deep Viral Voice', icon: '🎤', isPro: false },
  { id: 'narrator', label: 'Hyper-Realistic Narrator', icon: '🗣️', isPro: true },
  { id: 'shoutcast', label: 'High-Energy Shoutcast', icon: '🔥', isPro: true },
];

const STYLE_OPTIONS = [
  { id: 'brainrot', label: 'Standard Brainrot', icon: '🧠', isPro: false },
  { id: 'cinematic', label: 'Cinematic Mastery', icon: '🎬', isPro: true },
  { id: 'luxury', label: 'Luxury/Wealth Aesthetic', icon: '💰', isPro: true },
];

export const VoiceStyleSelector = ({
  isPro,
  onVoiceChange,
  onStyleChange,
  onUpgradeClick,
  selectedVoice,
  selectedStyle,
}: VoiceStyleSelectorProps) => {
  const { theme } = useTheme();

  const handleVoiceSelect = (voice: typeof VOICE_OPTIONS[0]) => {
    if (voice.isPro && !isPro) {
      onUpgradeClick();
      return;
    }
    onVoiceChange(voice.id);
  };

  const handleStyleSelect = (style: typeof STYLE_OPTIONS[0]) => {
    if (style.isPro && !isPro) {
      onUpgradeClick();
      return;
    }
    onStyleChange(style.id);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Voice Model Selection */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
          <Mic className="w-4 h-4" />
          Voice Model
        </label>
        <div className="flex flex-wrap gap-2">
          {VOICE_OPTIONS.map((voice) => {
            const isSelected = selectedVoice === voice.id;
            const isLocked = voice.isPro && !isPro;
            
            return (
              <motion.button
                key={voice.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVoiceSelect(voice)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300 border
                  ${isSelected && !isLocked
                    ? 'bg-primary/20 border-primary text-primary'
                    : isLocked
                      ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-amber-600/10'
                      : theme === 'dark'
                        ? 'bg-background/50 border-border hover:border-primary/50'
                        : 'bg-white border-border hover:border-primary/50'
                  }
                `}
              >
                <span>{voice.icon}</span>
                <span>{voice.label}</span>
                {isLocked && (
                  <span className="flex items-center gap-1 ml-1">
                    <Gem className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <Lock className="w-3 h-3 text-amber-400" />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Output Style Selection */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Output Style
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLE_OPTIONS.map((style) => {
            const isSelected = selectedStyle === style.id;
            const isLocked = style.isPro && !isPro;
            
            return (
              <motion.button
                key={style.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStyleSelect(style)}
                className={`
                  relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-300 border
                  ${isSelected && !isLocked
                    ? 'bg-primary/20 border-primary text-primary'
                    : isLocked
                      ? 'border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-amber-600/10'
                      : theme === 'dark'
                        ? 'bg-background/50 border-border hover:border-primary/50'
                        : 'bg-white border-border hover:border-primary/50'
                  }
                `}
              >
                <span>{style.icon}</span>
                <span>{style.label}</span>
                {isLocked && (
                  <span className="flex items-center gap-1 ml-1">
                    <Gem className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <Lock className="w-3 h-3 text-amber-400" />
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
