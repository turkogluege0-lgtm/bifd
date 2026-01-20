import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl gradient-text">{t('privacy.title')}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-muted-foreground text-sm">
            <section>
              <h3 className="font-semibold text-foreground mb-2">{t('privacy.section1.title')}</h3>
              <p>{t('privacy.section1.content')}</p>
            </section>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">{t('privacy.section2.title')}</h3>
              <p>{t('privacy.section2.content')}</p>
            </section>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">{t('privacy.section3.title')}</h3>
              <p>{t('privacy.section3.content')}</p>
            </section>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">{t('privacy.section4.title')}</h3>
              <p>{t('privacy.section4.content')}</p>
            </section>
            
            <section>
              <h3 className="font-semibold text-foreground mb-2">{t('privacy.section5.title')}</h3>
              <p>{t('privacy.section5.content')}</p>
            </section>
            
            <p className="text-xs text-muted-foreground/60 pt-4 border-t border-border">
              {t('privacy.lastUpdated')}
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
