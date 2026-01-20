import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Send, Mail } from 'lucide-react';

const CONTACT_FORMSPREE_URL = 'https://formspree.io/f/mnjjangz';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !message.trim()) {
      toast.error(t('contact.error.empty'));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(CONTACT_FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          message,
        }),
      });

      if (response.ok) {
        toast.success(t('contact.success'));
        setEmail('');
        setMessage('');
        onClose();
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      toast.error(t('contact.error.send'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl gradient-text flex items-center gap-2">
            <Mail className="w-5 h-5" />
            {t('contact.title')}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">{t('contact.email')}</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('contact.emailPlaceholder')}
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm text-muted-foreground">{t('contact.message')}</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('contact.messagePlaceholder')}
              className="mt-1 min-h-[120px]"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t('contact.send')}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
