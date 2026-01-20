import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ViralShowcaseSection } from '@/components/ViralShowcaseSection';
import { PricingSection } from '@/components/PricingSection';
import { Footer } from '@/components/Footer';
import { useSocialProofToasts } from '@/hooks/useSocialProofToasts';

const Index = () => {
  // Enable social proof toasts on landing page
  useSocialProofToasts(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ViralShowcaseSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
