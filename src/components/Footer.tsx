import { useState } from 'react';
import { Sparkles, MessageCircle, Handshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';
import { ContactModal } from '@/components/ContactModal';
import { PartnershipModal } from '@/components/PartnershipModal';
import { TermsOfServiceModal } from '@/components/TermsOfServiceModal';

// TikTok Icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [partnershipOpen, setPartnershipOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <>
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="font-bold gradient-text">ViralGen</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                {t('footer.support')}
              </h4>
              <button
                onClick={() => setContactOpen(true)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.contactUs')}
              </button>
            </div>

            {/* Partnership */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Handshake className="w-4 h-4 text-brand-cyan" />
                {t('footer.partnershipTitle')}
              </h4>
              <button
                onClick={() => setPartnershipOpen(true)}
                className="text-sm text-muted-foreground hover:text-brand-cyan transition-colors"
              >
                {t('footer.partnershipLink')}
              </button>
            </div>

            {/* Social & Legal */}
            <div>
              <h4 className="font-semibold mb-3">{t('footer.followUs')}</h4>
              <a 
                href="https://www.tiktok.com/@viralgenofficial?_r=1&_t=ZS-92zMbN3bwyw" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm hover:text-primary transition-colors ${theme === 'dark' ? 'text-muted-foreground' : 'text-muted-foreground'}`}
              >
                <TikTokIcon className="w-5 h-5" />
                @viralgenofficial
              </a>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {t('footer.privacy')}
                </button>
                <button
                  onClick={() => setTermsOpen(true)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {t('footer.terms')}
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border/30 text-center">
            <p className="text-sm text-muted-foreground">© 2026 ViralGen Global - The Future of Viral AI</p>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <PartnershipModal isOpen={partnershipOpen} onClose={() => setPartnershipOpen(false)} />
      <TermsOfServiceModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} />
    </>
  );
};
