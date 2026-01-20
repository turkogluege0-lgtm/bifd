import { motion } from 'framer-motion';
import { Skull, Smile, DollarSign, Ghost } from 'lucide-react';

interface NichePillsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const NICHE_OPTIONS = [
  {
    icon: Skull,
    label: '💀 Reddit Brainrot',
    prompt: 'Generate a viral Reddit story with split-screen gameplay',
    gradient: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-500/30',
    hoverColor: 'hover:border-red-500/60',
  },
  {
    icon: Smile,
    label: '🤡 AI Debate/Drama',
    prompt: 'Create an intense AI debate between two characters about a trending topic',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    hoverColor: 'hover:border-purple-500/60',
  },
  {
    icon: DollarSign,
    label: '💰 Side Hustle Viral',
    prompt: 'Make a high-energy side hustle motivation video for Gen Z',
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    hoverColor: 'hover:border-green-500/60',
  },
  {
    icon: Ghost,
    label: '👽 Uncanny Story',
    prompt: 'Create a creepy, uncanny valley style storytelling script',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    hoverColor: 'hover:border-blue-500/60',
  },
];

export const NichePills = ({ onSelect, disabled }: NichePillsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {NICHE_OPTIONS.map((option, index) => {
        return (
          <motion.button
            key={option.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(option.prompt)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full
              bg-gradient-to-r ${option.gradient}
              border ${option.borderColor} ${option.hoverColor}
              text-sm font-medium
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              hover:scale-105 active:scale-95
            `}
          >
            <span>{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
