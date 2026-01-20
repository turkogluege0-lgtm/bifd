import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQ_ITEMS = [
  { 
    question: 'How fast is the generation?', 
    answer: 'Our AI generates viral-ready content in under 60 seconds. Pro users get priority queue access for instant rendering.' 
  },
  { 
    question: 'Will I go viral?', 
    answer: 'Our AI is trained on millions of viral videos. While we can\'t guarantee virality, our content is optimized for maximum engagement and retention.' 
  },
  { 
    question: 'Can I cancel anytime?', 
    answer: 'Yes! You can cancel your Pro subscription at any time. We also offer a 7-day money-back guarantee.' 
  },
  { 
    question: 'What platforms can I post to?', 
    answer: 'Our content is optimized for TikTok, YouTube Shorts, Instagram Reels, and all major short-form video platforms.' 
  },
];

export const FAQSection = () => {
  const { theme } = useTheme();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
      </div>

      <div className={`glass-card-premium p-6 rounded-2xl border border-border/30`}>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border/30"
            >
              <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};
