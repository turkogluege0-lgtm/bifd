import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface Translations {
  [key: string]: {
    en: string;
    tr: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.features': { en: 'Features', tr: 'Özellikler' },
  'nav.pricing': { en: 'Pricing', tr: 'Fiyatlandırma' },
  'nav.login': { en: 'Login', tr: 'Giriş' },
  'nav.getStarted': { en: 'Get Started', tr: 'Başla' },
  'nav.dashboard': { en: 'Dashboard', tr: 'Panel' },
  'nav.logout': { en: 'Logout', tr: 'Çıkış' },
  'nav.freePlan': { en: 'Free Plan', tr: 'Ücretsiz Plan' },

  // Hero
  'hero.title': { en: 'Generate Viral Content', tr: 'Viral İçerik Oluştur' },
  'hero.titleHighlight': { en: 'with AI Power', tr: 'Yapay Zeka ile' },
  'hero.subtitle': { en: 'Transform your ideas into engaging, shareable content that captivates audiences and drives results.', tr: 'Fikirlerinizi izleyicileri etkileyen ve sonuç getiren ilgi çekici, paylaşılabilir içeriklere dönüştürün.' },
  'hero.startFree': { en: 'Start Free', tr: 'Ücretsiz Başla' },
  'hero.learnMore': { en: 'Learn More', tr: 'Daha Fazla' },

  // Features
  'features.title': { en: 'Powerful Features', tr: 'Güçlü Özellikler' },
  'features.subtitle': { en: 'Everything you need to create viral content', tr: 'Viral içerik oluşturmak için ihtiyacınız olan her şey' },
  'features.ai.title': { en: 'AI-Powered Generation', tr: 'Yapay Zeka Destekli' },
  'features.ai.desc': { en: 'Advanced algorithms create engaging content tailored to your audience', tr: 'Gelişmiş algoritmalar kitlenize özel ilgi çekici içerik oluşturur' },
  'features.analytics.title': { en: 'Smart Analytics', tr: 'Akıllı Analitik' },
  'features.analytics.desc': { en: 'Track performance and optimize your content strategy', tr: 'Performansı takip edin ve içerik stratejinizi optimize edin' },
  'features.speed.title': { en: 'Lightning Fast', tr: 'Işık Hızında' },
  'features.speed.desc': { en: 'Generate content in seconds, not hours', tr: 'Saatler değil saniyeler içinde içerik oluşturun' },
  'features.templates.title': { en: 'Smart Templates', tr: 'Akıllı Şablonlar' },
  'features.templates.desc': { en: 'Pre-built templates for every platform and purpose', tr: 'Her platform ve amaç için hazır şablonlar' },

  // Pricing
  'pricing.title': { en: 'Simple Pricing', tr: 'Basit Fiyatlandırma' },
  'pricing.subtitle': { en: 'Choose the plan that fits your needs', tr: 'İhtiyaçlarınıza uygun planı seçin' },
  'pricing.free': { en: 'Free', tr: 'Ücretsiz' },
  'pricing.free.price': { en: '$0', tr: '$0' },
  'pricing.free.period': { en: '/month', tr: '/ay' },
  'pricing.free.feature1': { en: '2 generations total', tr: 'Toplam 2 içerik' },
  'pricing.free.feature2': { en: 'Basic templates', tr: 'Temel şablonlar' },
  'pricing.free.feature3': { en: 'Community support', tr: 'Topluluk desteği' },
  'pricing.free.cta': { en: 'Current Plan', tr: 'Mevcut Plan' },
  'pricing.pro': { en: 'Pro Studio', tr: 'Pro Studio' },
  'pricing.pro.price': { en: '$19', tr: '$19' },
  'pricing.pro.period': { en: '/month', tr: '/ay' },
  'pricing.pro.feature1': { en: 'Unlimited generations', tr: 'Sınırsız içerik' },
  'pricing.pro.feature2': { en: 'All premium templates', tr: 'Tüm premium şablonlar' },
  'pricing.pro.feature3': { en: 'Priority support', tr: 'Öncelikli destek' },
  'pricing.pro.feature4': { en: 'Advanced analytics', tr: 'Gelişmiş analitik' },
  'pricing.pro.cta': { en: 'Upgrade Now', tr: 'Şimdi Yükselt' },

  // Dashboard
  'dashboard.title': { en: 'Generate Content', tr: 'İçerik Oluştur' },
  'dashboard.prefix': { en: 'Ask ViralGen to ', tr: 'ViralGen\'den iste: ' },
  'dashboard.placeholder': { en: 'describe what content you want...', tr: 'ne tür içerik istediğinizi açıklayın...' },
  'dashboard.generate': { en: 'Generate', tr: 'Oluştur' },
  'dashboard.processing': { en: 'Processing...', tr: 'İşleniyor...' },
  'dashboard.success': { en: 'Request submitted! Your content is being generated.', tr: 'İstek gönderildi! İçeriğiniz oluşturuluyor.' },
  'dashboard.credits': { en: 'Credits', tr: 'Kredi' },
  'dashboard.creditsTitle': { en: 'Generation Credits', tr: 'Üretim Kredisi' },
  'dashboard.creditsSubtitle': { en: 'Free tier allowance', tr: 'Ücretsiz plan hakkı' },
  'dashboard.remaining': { en: 'credits remaining', tr: 'kredi kaldı' },
  'dashboard.noCreditsMessage': { en: 'Credits: 0/2. Upgrade to Pro Studio for unlimited access.', tr: 'Kredi: 0/2. Sınırsız erişim için Pro Studio\'ya yükseltin.' },
  'dashboard.upgradeRequired': { en: 'Upgrade to Pro', tr: 'Pro\'ya Yükselt' },
  'dashboard.error.empty': { en: 'Please enter a prompt', tr: 'Lütfen bir istek girin' },
  'dashboard.error.noCredits': { en: 'No credits remaining. Please upgrade to Pro.', tr: 'Kredi kalmadı. Lütfen Pro\'ya yükseltin.' },
  'dashboard.error.submit': { en: 'Failed to submit request. Please try again.', tr: 'İstek gönderilemedi. Lütfen tekrar deneyin.' },

  // Auth
  'auth.login': { en: 'Login', tr: 'Giriş Yap' },
  'auth.signup': { en: 'Sign Up', tr: 'Kayıt Ol' },
  'auth.email': { en: 'Email', tr: 'E-posta' },
  'auth.password': { en: 'Password', tr: 'Şifre' },
  'auth.noAccount': { en: "Don't have an account?", tr: 'Hesabınız yok mu?' },
  'auth.hasAccount': { en: 'Already have an account?', tr: 'Zaten hesabınız var mı?' },
  'auth.welcomeBack': { en: 'Welcome Back', tr: 'Tekrar Hoşgeldiniz' },
  'auth.createAccount': { en: 'Create Account', tr: 'Hesap Oluştur' },
  'auth.loginSubtitle': { en: 'Sign in to access your dashboard', tr: 'Panelinize erişmek için giriş yapın' },
  'auth.signupSubtitle': { en: 'Start creating viral content today', tr: 'Bugün viral içerik oluşturmaya başlayın' },
  'auth.loginRequired': { en: 'Please log in to continue', tr: 'Devam etmek için lütfen giriş yapın' },

  // Warning
  'warning.text': { en: 'Fake clicks will be penalized. Accounts of those using empty spaces will be restricted and, if continued, will be closed.', tr: 'Boşa tıklayanlar cezalandırılır. Boş alanları kullananların hesapları kısıtlanır ve devam ederse kapatılır.' },

  // Checkout
  'checkout.title': { en: 'Complete Your Upgrade', tr: 'Yükseltmenizi Tamamlayın' },
  'checkout.card': { en: 'Card Number', tr: 'Kart Numarası' },
  'checkout.expiry': { en: 'Expiry', tr: 'Son Kullanım' },
  'checkout.cvc': { en: 'CVC', tr: 'CVC' },
  'checkout.pay': { en: 'Pay $19/month', tr: 'Aylık $19 Öde' },
  'checkout.secure': { en: 'Secure payment powered by Stripe', tr: 'Stripe tarafından güvenli ödeme' },
  'checkout.cancel': { en: 'Cancel', tr: 'İptal' },

  // Footer
  'footer.rights': { en: '© 2026 ViralGen Global - The Future of Viral AI', tr: '© 2026 ViralGen Global - Viral AI\'ın Geleceği' },
  'footer.tagline': { en: 'AI-powered viral content generation', tr: 'Yapay zeka destekli viral içerik üretimi' },
  'footer.support': { en: 'Have a question?', tr: 'Sorunuz mu var?' },
  'footer.contactUs': { en: 'Contact Us', tr: 'Bize Ulaşın' },
  'footer.followUs': { en: 'Follow Us', tr: 'Bizi Takip Edin' },
  'footer.privacy': { en: 'Privacy Policy', tr: 'Gizlilik Politikası' },
  'footer.terms': { en: 'Terms of Service', tr: 'Kullanım Şartları' },
  'footer.partnershipTitle': { en: 'Partnership', tr: 'Ortaklık' },
  'footer.partnershipLink': { en: 'Join Affiliate Program', tr: 'Ortaklık Programına Katıl' },

  // Privacy Policy
  'privacy.title': { en: 'Privacy Policy', tr: 'Gizlilik Politikası' },
  'privacy.section1.title': { en: 'Information We Collect', tr: 'Topladığımız Bilgiler' },
  'privacy.section1.content': { en: 'We collect information you provide directly, including email addresses and content generation requests. We also collect usage data to improve our services.', tr: 'Doğrudan sağladığınız e-posta adresleri ve içerik oluşturma istekleri dahil bilgileri topluyoruz. Hizmetlerimizi geliştirmek için kullanım verilerini de topluyoruz.' },
  'privacy.section2.title': { en: 'How We Use Your Information', tr: 'Bilgilerinizi Nasıl Kullanıyoruz' },
  'privacy.section2.content': { en: 'Your information is used to provide and improve our AI content generation services, send service updates, and ensure platform security.', tr: 'Bilgileriniz yapay zeka içerik oluşturma hizmetlerimizi sağlamak ve geliştirmek, hizmet güncellemeleri göndermek ve platform güvenliğini sağlamak için kullanılır.' },
  'privacy.section3.title': { en: 'Data Security', tr: 'Veri Güvenliği' },
  'privacy.section3.content': { en: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or destruction.', tr: 'Kişisel bilgilerinizi yetkisiz erişim, ifşa veya imhadan korumak için sektör standardı güvenlik önlemleri uyguluyoruz.' },
  'privacy.section4.title': { en: 'Third-Party Services', tr: 'Üçüncü Taraf Hizmetleri' },
  'privacy.section4.content': { en: 'We may use third-party services for analytics and payment processing. These services have their own privacy policies governing the use of your information.', tr: 'Analitik ve ödeme işlemleri için üçüncü taraf hizmetleri kullanabiliriz. Bu hizmetlerin bilgilerinizin kullanımını düzenleyen kendi gizlilik politikaları vardır.' },
  'privacy.section5.title': { en: 'Your Rights', tr: 'Haklarınız' },
  'privacy.section5.content': { en: 'You have the right to access, correct, or delete your personal data. Contact us at support@viralgen.ai for any privacy-related requests.', tr: 'Kişisel verilerinize erişme, düzeltme veya silme hakkınız vardır. Gizlilikle ilgili talepler için support@viralgen.ai adresinden bizimle iletişime geçin.' },
  'privacy.lastUpdated': { en: 'Last updated: January 2026', tr: 'Son güncelleme: Ocak 2026' },

  // Terms of Service
  'terms.title': { en: 'Terms of Service', tr: 'Kullanım Şartları' },
  'terms.section1.title': { en: 'Acceptance of Terms', tr: 'Şartların Kabulü' },
  'terms.section1.content': { en: 'By accessing and using ViralGen, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.', tr: 'ViralGen\'e erişerek ve kullanarak bu Kullanım Şartlarına bağlı kalmayı kabul edersiniz. Kabul etmiyorsanız lütfen hizmetlerimizi kullanmayın.' },
  'terms.section2.title': { en: 'Service Description', tr: 'Hizmet Açıklaması' },
  'terms.section2.content': { en: 'ViralGen provides AI-powered content generation services. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.', tr: 'ViralGen yapay zeka destekli içerik oluşturma hizmetleri sunmaktadır. Hizmetin herhangi bir yönünü istediğimiz zaman değiştirme, askıya alma veya durdurma hakkını saklı tutarız.' },
  'terms.section3.title': { en: 'User Responsibilities', tr: 'Kullanıcı Sorumlulukları' },
  'terms.section3.content': { en: 'You are responsible for all content you create using our service. You agree not to use ViralGen for any illegal, harmful, or offensive purposes.', tr: 'Hizmetimizi kullanarak oluşturduğunuz tüm içeriklerden siz sorumlusunuz. ViralGen\'i yasa dışı, zararlı veya saldırgan amaçlarla kullanmamayı kabul ediyorsunuz.' },
  'terms.section4.title': { en: 'Intellectual Property', tr: 'Fikri Mülkiyet' },
  'terms.section4.content': { en: 'Content generated through ViralGen belongs to you. However, we retain rights to our platform, technology, and branding.', tr: 'ViralGen aracılığıyla oluşturulan içerik size aittir. Ancak platformumuz, teknolojimiz ve markamız üzerindeki hakları saklı tutarız.' },
  'terms.section5.title': { en: 'Limitation of Liability', tr: 'Sorumluluk Sınırlaması' },
  'terms.section5.content': { en: 'ViralGen is provided "as is" without warranties. We are not liable for any damages arising from your use of the service.', tr: 'ViralGen herhangi bir garanti olmaksızın "olduğu gibi" sağlanmaktadır. Hizmeti kullanımınızdan kaynaklanan herhangi bir zarardan sorumlu değiliz.' },
  'terms.lastUpdated': { en: 'Last updated: January 2026', tr: 'Son güncelleme: Ocak 2026' },

  // Contact
  'contact.title': { en: 'Contact Us', tr: 'Bize Ulaşın' },
  'contact.email': { en: 'Your Email', tr: 'E-posta Adresiniz' },
  'contact.emailPlaceholder': { en: 'you@example.com', tr: 'siz@ornek.com' },
  'contact.message': { en: 'Message', tr: 'Mesaj' },
  'contact.messagePlaceholder': { en: 'How can we help you?', tr: 'Size nasıl yardımcı olabiliriz?' },
  'contact.send': { en: 'Send Message', tr: 'Mesaj Gönder' },
  'contact.success': { en: 'Message sent successfully!', tr: 'Mesaj başarıyla gönderildi!' },
  'contact.error.empty': { en: 'Please fill in all fields', tr: 'Lütfen tüm alanları doldurun' },
  'contact.error.send': { en: 'Failed to send message. Please try again.', tr: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.' },

  // Partnership Modal
  'partnership.title': { en: 'Join our Affiliate Program!', tr: 'Ortaklık Programımıza Katılın!' },
  'partnership.subtitle': { en: 'Earn money by promoting ViralGen', tr: 'ViralGen\'i tanıtarak para kazanın' },
  'partnership.benefit1': { en: '20% Recurring Commission', tr: '%20 Yinelenen Komisyon' },
  'partnership.benefit1Desc': { en: 'Earn 20% on every Pro Studio referral, month after month.', tr: 'Her Pro Studio yönlendirmesinden ay be ay %20 kazanın.' },
  'partnership.benefit2': { en: 'Unique Affiliate Link', tr: 'Benzersiz Ortaklık Linki' },
  'partnership.benefit2Desc': { en: 'Get your personalized tracking link to share with your audience.', tr: 'Kitlenizle paylaşmak için kişiselleştirilmiş izleme linkinizi alın.' },
  'partnership.contact': { en: 'Ready to start earning? Contact us on TikTok for your unique link!', tr: 'Kazanmaya hazır mısınız? Benzersiz linkiniz için TikTok\'ta bize ulaşın!' },
  'partnership.cta': { en: 'Contact @viralgenofficial', tr: '@viralgenofficial ile İletişime Geç' },

  // Niche Pills
  'niche.reddit': { en: '💀 Reddit Brainrot', tr: '💀 Reddit Brainrot' },
  'niche.debate': { en: '🤡 AI Debate/Drama', tr: '🤡 AI Tartışma/Drama' },
  'niche.hustle': { en: '💰 Side Hustle Viral', tr: '💰 Yan İş Viral' },
  'niche.uncanny': { en: '👽 Uncanny Story', tr: '👽 Tekinsiz Hikaye' },

  // Viral Showcase Section
  'showcase.badge': { en: 'Viral Proof', tr: 'Viral Kanıt' },
  'showcase.title': { en: 'Unleash the Viral Power', tr: 'Viral Gücü Serbest Bırakın' },
  'showcase.subtitle': { en: 'See what our AI creates - content that captivates millions', tr: 'Yapay zekamızın neler yarattığını görün - milyonları etkileyen içerikler' },
  'showcase.viral': { en: 'Viral Hit', tr: 'Viral Hit' },

  // Dashboard Examples
  'examples.title': { en: 'Viral Examples', tr: 'Viral Örnekler' },
  'examples.subtitle': { en: 'Get inspired by top-performing content', tr: 'En iyi performans gösteren içeriklerden ilham alın' },
  'examples.viral': { en: 'Trending', tr: 'Trend' },
  
  // Generation Progress
  'generatingVideo': { en: 'Generating your viral video...', tr: 'Viral videonuz oluşturuluyor...' },
  'generationComplete': { en: 'Video Request Sent! Check your email soon.', tr: 'Video İsteği Gönderildi! E-postanızı yakında kontrol edin.' },

  // Progress Bar Queue & Status
  'progress.queuePosition': { en: 'Your Position', tr: 'Sıranız' },
  'progress.waitTime': { en: 'Est. Wait', tr: 'Tahmini Süre' },
  'progress.success': { en: 'Success!', tr: 'Başarılı!' },
  'progress.successMessage': { en: 'Viral Request Sent! Your video is being processed. Check your email inbox shortly.', tr: 'Viral İstek Gönderildi! Videonuz işleniyor. Kısa süre içinde e-posta kutunuzu kontrol edin.' },

  // Status Messages (Updated - more premium)
  'progress.status1': { en: 'Scraping Viral Reddit Hooks & Trending Narratives...', tr: 'Viral Reddit Çengelleri ve Trend Anlatılar Taranıyor...' },
  'progress.status2': { en: 'Synthesizing High-Retention AI Script with Neuro-Linguistic Hooks...', tr: 'Nöro-Linguistik Çengellerle Yüksek Tutma AI Senaryosu Sentezleniyor...' },
  'progress.status3': { en: 'Fetching Dynamic Split-Screen Assets (Subway Surfers/Parkour)...', tr: 'Dinamik Bölünmüş Ekran Varlıkları Getiriliyor (Subway Surfers/Parkour)...' },
  'progress.status4': { en: 'Mastering Audio: Adding Trending High-Energy Background Beats...', tr: 'Ses Masterlanıyor: Trend Yüksek Enerjili Arka Plan Müzikleri Ekleniyor...' },
  'progress.status5': { en: 'Applying Neural Auto-Captions for Maximum Watch Time...', tr: 'Maksimum İzleme Süresi için Nöral Otomatik Altyazılar Uygulanıyor...' },
  'progress.status6': { en: 'Finalizing 4K Ultra-HD Brainrot Export...', tr: '4K Ultra-HD Brainrot Dışa Aktarımı Tamamlanıyor...' },
  'progress.status7': { en: 'Optimizing video metadata for YT Shorts & TikTok algorithms...', tr: 'Video metadata\'sı YT Shorts & TikTok algoritmaları için optimize ediliyor...' },
  'progress.status8': { en: 'Finalizing your viral masterpiece...', tr: 'Viral şaheseriniz tamamlanıyor...' },

  // Trust Bar
  'trust.users': { en: 'Trusted by 10,000+ Content Creators', tr: '10.000+ İçerik Üreticisi Tarafından Güveniliyor' },
  'trust.videos': { en: 'Total Videos: 142,892', tr: 'Toplam Video: 142.892' },
  'trust.trending': { en: '#1 AI Video Tool', tr: '#1 AI Video Aracı' },

  // Voice & Style Selector
  'selector.voice': { en: 'Voice Model', tr: 'Ses Modeli' },
  'selector.style': { en: 'Output Style', tr: 'Çıktı Stili' },
  'voice.deep': { en: 'Deep Viral Voice', tr: 'Derin Viral Ses' },
  'voice.narrator': { en: 'Hyper-Realistic Narrator', tr: 'Hiper-Gerçekçi Anlatıcı' },
  'voice.shoutcast': { en: 'High-Energy Shoutcast', tr: 'Yüksek Enerjili Shoutcast' },
  'style.brainrot': { en: 'Standard Brainrot', tr: 'Standart Brainrot' },
  'style.cinematic': { en: 'Cinematic Mastery', tr: 'Sinematik Ustalık' },
  'style.luxury': { en: 'Luxury/Wealth Aesthetic', tr: 'Lüks/Zenginlik Estetiği' },

  // FAQ
  'faq.title': { en: 'Frequently Asked Questions', tr: 'Sıkça Sorulan Sorular' },
  'faq.q1': { en: 'How fast is it?', tr: 'Ne kadar hızlı?' },
  'faq.a1': { en: 'Most videos are generated within 60 seconds. Pro users get priority queue access for even faster processing.', tr: 'Çoğu video 60 saniye içinde oluşturulur. Pro kullanıcılar daha hızlı işlem için öncelikli kuyruk erişimine sahiptir.' },
  'faq.q2': { en: 'Will I go viral?', tr: 'Viral olacak mıyım?' },
  'faq.a2': { en: 'Our AI is trained on millions of viral videos to maximize engagement. While we can\'t guarantee virality, our users see significantly higher engagement rates.', tr: 'AI\'mız etkileşimi maksimize etmek için milyonlarca viral video üzerinde eğitildi. Viralliği garanti edemesek de, kullanıcılarımız önemli ölçüde daha yüksek etkileşim oranları görüyor.' },
  'faq.q3': { en: 'Can I cancel anytime?', tr: 'İstediğim zaman iptal edebilir miyim?' },
  'faq.a3': { en: 'Absolutely! Cancel your Pro subscription anytime with no questions asked. Your access continues until the end of your billing period.', tr: 'Kesinlikle! Pro aboneliğinizi istediğiniz zaman soru sorulmadan iptal edebilirsiniz. Erişiminiz fatura döneminizin sonuna kadar devam eder.' },
  'faq.q4': { en: 'What makes ViralGen different?', tr: 'ViralGen\'i farklı kılan nedir?' },
  'faq.a4': { en: 'ViralGen combines cutting-edge AI with proven viral formulas. We\'re the only platform offering split-screen gameplay, auto-captions, and trend analysis in one click.', tr: 'ViralGen, son teknoloji AI\'yı kanıtlanmış viral formüllerle birleştirir. Tek tıklamayla bölünmüş ekran oynanış, otomatik altyazı ve trend analizi sunan tek platformuz.' },

  // Premium Modal
  'modal.title': { en: 'Unlock the Viral Factory', tr: 'Viral Fabrikayı Aç' },
  'modal.period': { en: 'month', tr: 'ay' },
  'modal.feature1': { en: 'Unlimited Generations', tr: 'Sınırsız Üretim' },
  'modal.feature2': { en: 'Priority Queue (Instant)', tr: 'Öncelikli Kuyruk (Anında)' },
  'modal.feature3': { en: '4K Resolution & Commercial License', tr: '4K Çözünürlük & Ticari Lisans' },
  'modal.feature4': { en: '24/7 Priority Support', tr: '7/24 Öncelikli Destek' },
  'modal.cta': { en: 'Join Pro Studio Now', tr: 'Şimdi Pro Studio\'ya Katıl' },
  'modal.guarantee': { en: '7-day money-back guarantee • Cancel anytime', tr: '7 günlük para iade garantisi • İstediğiniz zaman iptal edin' },
  'modal.noCredits': { en: 'You\'ve used all your free credits. Upgrade to Pro for unlimited access!', tr: 'Tüm ücretsiz kredilerinizi kullandınız. Sınırsız erişim için Pro\'ya yükseltin!' },
  'modal.proFeature': { en: 'This premium voice/style is only available for Pro Studio members.', tr: 'Bu premium ses/stil sadece Pro Studio üyeleri için kullanılabilir.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('viralgen-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('viralgen-language', lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
