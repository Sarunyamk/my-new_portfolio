import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { contactSchema, ContactFormData } from '@/utils/validation';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      contactSchema.parse(formData);
      setErrors({});

      setIsLoading(true);
      toast({
        title: t('contact.success'),
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: t('contact.error'),
          variant: 'destructive',
        });
      } else {
        const formattedErrors: Partial<Record<keyof ContactFormData, string>> = {};

        (error as any).errors?.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            const field = err.path[0] as keyof ContactFormData;
            formattedErrors[field] = err.message;
          }
        });

        setErrors(formattedErrors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          {t('contact.title')}
        </h2>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-background/80 backdrop-blur-md border border-border rounded-xl shadow-md p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-destructive' : 'border-input'
                    } bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-destructive' : 'border-input'
                    } bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block mb-2 font-medium">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.subject ? 'border-destructive' : 'border-input'
                  } bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors`}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-destructive">{errors.subject}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 font-medium">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-destructive' : 'border-input'
                  } bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                t('contact.submit')
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;