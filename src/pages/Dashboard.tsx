import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { PricingSection } from '@/components/PricingSection';
import { CheckoutModal } from '@/components/CheckoutModal';
import { WarningBanner } from '@/components/WarningBanner';
import { Footer } from '@/components/Footer';
import { ViralExamplesGrid } from '@/components/ViralExamplesGrid';
import { GenerationProgressBar } from '@/components/GenerationProgressBar';
import { NichePills } from '@/components/NichePills';
import { TrustBar } from '@/components/TrustBar';
import { VoiceStyleSelector } from '@/components/VoiceStyleSelector';
import { FAQSection } from '@/components/FAQSection';
import { PremiumPricingModal } from '@/components/PremiumPricingModal';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useGenerationTimer } from '@/hooks/useGenerationTimer';
import { useSupabaseCredits } from '@/hooks/useSupabaseCredits';
import { useSocialProofToasts } from '@/hooks/useSocialProofToasts';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'sonner';

const FORMSPREE_URL = 'https://formspree.io/f/xreezdyy';
const TIMER_DURATION = 60;

const Dashboard = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { remainingTime, isActive, startTimer } = useGenerationTimer();
  const { credits, maxCredits, hasCredits, useCredit, loading: creditsLoading } = useSupabaseCredits();
  const { isPro, isAdmin, isFree, loading: roleLoading } = useUserRole();
  
  // Admins and Pro users have unlimited access
  const hasUnlimitedAccess = isAdmin || isPro;
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [premiumModalMessage, setPremiumModalMessage] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('deep');
  const [selectedStyle, setSelectedStyle] = useState('brainrot');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useSocialProofToasts(true);

  const prefix = 'Create a viral TikTok/Shorts video: ';
  const progress = isActive ? ((TIMER_DURATION - remainingTime) / TIMER_DURATION) * 100 : 0;

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      toast.error('Please describe what you want to generate');
      return;
    }

    setLoading(true);
    try {
      if (!hasUnlimitedAccess) {
        const success = await useCredit();
        if (!success) {
          setPremiumModalMessage("You've used all your free credits. Upgrade to Pro for unlimited access!");
          setPremiumModalOpen(true);
          setLoading(false);
          return; 
        }
      }

      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'New ViralGen Request',
          User: user?.email || 'Unknown',
          Request: prefix + userInput,
          Voice: selectedVoice,
          Style: selectedStyle,
          Timestamp: new Date().toISOString(),
          UserRole: isAdmin ? 'admin' : isPro ? 'pro' : 'free',
        }),
      });

      if (response.ok) {
        toast.success('Request submitted successfully!');
        if (typeof startTimer === 'function') startTimer();
        setUserInput('');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast.error('Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  const handleNicheSelect = (prompt: string) => { setUserInput(prompt); textareaRef.current?.focus(); };
  const handleUpgradeClick = (message?: string) => { setPremiumModalMessage(message || 'Unlock unlimited access with Pro Studio!'); setPremiumModalOpen(true); };
  const isDisabled = isActive || loading || (!hasUnlimitedAccess && !hasCredits) || creditsLoading || roleLoading;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto"><TrustBar /></div>
          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
              <div className={`${theme === 'dark' ? 'glass-card-premium' : 'glass-card-premium-light'} p-6 md:p-8`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.05, rotate: 5 }} className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center glow-purple">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h1 className="text-xl sm:text-2xl font-bold">Viral Content Generator</h1>
                      <p className="text-muted-foreground text-sm">Powered by AI</p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-background/50' : 'bg-muted/50'} flex items-center gap-2 border border-border/30`}>
                    <Zap className={`w-4 h-4 ${hasUnlimitedAccess || hasCredits ? 'text-secondary' : 'text-destructive'}`} />
                    <span className={`font-bold text-sm sm:text-base ${hasUnlimitedAccess || hasCredits ? 'text-foreground' : 'text-destructive'}`}>
                      {creditsLoading || roleLoading ? '...' : isAdmin ? '∞ SYSTEM ADMIN' : isPro ? '∞ Pro' : `Credits: ${credits}/${maxCredits}`}
                    </span>
                    {isAdmin && !creditsLoading && !roleLoading && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold animate-pulse">
                        SYSTEM ADMIN
                      </span>
                    )}
                    {isPro && !isAdmin && !creditsLoading && !roleLoading && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold">
                        PRO
                      </span>
                    )}
                    {isFree && !creditsLoading && !roleLoading && (
                      <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">Free</span>
                    )}
                  </motion.div>
                </div>
                {!hasUnlimitedAccess && !hasCredits && !creditsLoading && !roleLoading && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">You've used all your free credits. Upgrade to Pro for unlimited access!</p>
                  </motion.div>
                )}
                <AnimatePresence>{isActive && <div className="mb-6"><GenerationProgressBar progress={progress} isActive={isActive} /></div>}</AnimatePresence>
                {!isActive && <VoiceStyleSelector isPro={hasUnlimitedAccess} selectedVoice={selectedVoice} selectedStyle={selectedStyle} onVoiceChange={setSelectedVoice} onStyleChange={setSelectedStyle} onUpgradeClick={() => handleUpgradeClick('This premium feature is only available for Pro Studio members.')} />}
                {!isActive && (hasUnlimitedAccess || hasCredits) && <NichePills onSelect={handleNicheSelect} disabled={isDisabled} />}
                {!isActive && (
                  <div className="mb-4">
                    <div className={`relative rounded-xl border ${theme === 'dark' ? 'bg-background/50' : 'bg-white'} border-border/30 overflow-hidden transition-all duration-300 focus-within:border-primary/50 focus-within:shadow-lg focus-within:shadow-primary/10`}>
                      <div className="px-4 pt-4 pb-1"><span className="text-primary font-medium">{prefix}</span></div>
                      <Textarea ref={textareaRef} value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Describe your viral video idea..." className="min-h-[100px] sm:min-h-[120px] border-0 bg-transparent resize-none focus-visible:ring-0 px-4 pb-4 pt-0" disabled={isDisabled} />
                    </div>
                  </div>
                )}
                {!isActive && (
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <Button onClick={handleGenerate} disabled={isDisabled} className="w-full btn-gradient text-white py-6 text-lg font-semibold">
                      {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : !hasUnlimitedAccess && !hasCredits ? <span>Upgrade to Continue</span> : <><Send className="mr-2 w-5 h-5" />Generate Viral Content</>}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
              <div className={`${theme === 'dark' ? 'glass-card-premium' : 'glass-card-premium-light'} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"><Zap className="w-5 h-5 text-secondary" /></motion.div>
                  <div><h3 className="font-semibold">Your Credits</h3><p className="text-xs text-muted-foreground">Generate viral content</p></div>
                </div>
                <div className="mb-4">
                  <div className="h-3 rounded-full bg-muted overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-primary to-secondary" initial={{ width: 0 }} animate={{ width: hasUnlimitedAccess ? '100%' : `${(credits / maxCredits) * 100}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} /></div>
                  <p className="text-xs text-muted-foreground mt-2">{creditsLoading || roleLoading ? '...' : isAdmin ? 'Admin - Unlimited' : isPro ? 'Pro - Unlimited' : `${credits} credits remaining`}</p>
                </div>
                {!hasUnlimitedAccess && !hasCredits && !creditsLoading && !roleLoading && <Button onClick={() => handleUpgradeClick()} className="w-full btn-gradient text-sm">Unlock Pro Studio</Button>}
              </div>
            </motion.div>
          </div>
          <div className="max-w-6xl mx-auto"><ViralExamplesGrid /></div>
          <div className="max-w-4xl mx-auto"><FAQSection /></div>
          <div className="max-w-4xl mx-auto mt-8"><PricingSection isDashboard onUpgrade={() => handleUpgradeClick()} /><div className="max-w-2xl mx-auto"><WarningBanner /></div></div>
        </div>
      </main>
      <Footer />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <PremiumPricingModal isOpen={premiumModalOpen} onClose={() => setPremiumModalOpen(false)} onCheckout={() => { setPremiumModalOpen(false); setCheckoutOpen(true); }} message={premiumModalMessage} />
    </div>
  );
};

export default Dashboard;
