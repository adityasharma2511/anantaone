import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ENQUIRY_OPTIONS } from '@/data/enquiryOptions';
import { useEnquiryModal } from '@/hooks/useEnquiryModal';
import { validateEnquiryForm } from '@/lib/enquiryValidation';
import { sendEnquiryEmail } from '@/lib/sendEnquiryEmail';
import { cn } from '@/lib/utils';

const INITIAL_FORM = {
  name: '',
  whatsapp: '',
  email: '',
  enquiryType: '',
  requirement: '',
};

const inputClassName =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 transition-colors focus:border-accent-blue/50 focus:outline-none focus:ring-2 focus:ring-accent-blue/20';

function SuccessToast({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed left-1/2 top-6 z-[200] w-[min(92vw,24rem)] -translate-x-1/2 rounded-xl border border-emerald-400/30 bg-[#0d1f18] px-5 py-4 text-center shadow-xl shadow-black/40"
          role="status"
          aria-live="polite"
        >
          <p className="font-heading text-base font-semibold text-white">Thank you.</p>
          <p className="mt-1 text-sm text-emerald-200/90">
            Our team will contact you soon.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

export function EnquiryModal() {
  const { isOpen, closeModal } = useEnquiryModal();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitError('');
    setStatus('idle');
  }, []);

  const handleClose = useCallback(() => {
    if (status === 'loading') return;
    closeModal();
    window.setTimeout(resetForm, 300);
  }, [closeModal, resetForm, status]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleClose, isOpen]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError('');
  };

  const handleWhatsAppChange = (event) => {
    const value = event.target.value.replace(/[^\d+\s-]/g, '');
    updateField('whatsapp', value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateEnquiryForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    setSubmitError('');

    try {
      await sendEnquiryEmail(form);
      setStatus('success');
      setShowToast(true);
      setForm(INITIAL_FORM);
      setErrors({});
      setSubmitError('');

      window.setTimeout(() => {
        setShowToast(false);
        closeModal();
        setStatus('idle');
      }, 2200);
    } catch (error) {
      setStatus('idle');
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <>
      <SuccessToast visible={showToast} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
          >
            <button
              type="button"
              aria-label="Close enquiry form"
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[min(92vh,820px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl shadow-black/50"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={handleClose}
                disabled={status === 'loading'}
                className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="custom-scrollbar overflow-y-auto px-6 pb-6 pt-8 sm:px-8 sm:pb-8">
                <div className="pr-8">
                  <h2
                    id="enquiry-modal-title"
                    className="font-heading text-2xl font-bold tracking-tight text-white sm:text-[1.65rem]"
                  >
                    Let&apos;s Discuss Your Requirement
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    Tell us about your project and our experts will get back to you
                    shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="enquiry-name" className="mb-1.5 block text-sm font-medium text-white">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      type="text"
                      value={form.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      placeholder="Enter your name"
                      className={cn(inputClassName, errors.name && 'border-red-400/60')}
                      autoComplete="name"
                    />
                    <FieldError message={errors.name} />
                  </div>

                  <div>
                    <label htmlFor="enquiry-whatsapp" className="mb-1.5 block text-sm font-medium text-white">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="enquiry-whatsapp"
                      type="tel"
                      inputMode="tel"
                      value={form.whatsapp}
                      onChange={handleWhatsAppChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={cn(inputClassName, errors.whatsapp && 'border-red-400/60')}
                      autoComplete="tel"
                    />
                    <FieldError message={errors.whatsapp} />
                  </div>

                  <div>
                    <label htmlFor="enquiry-email" className="mb-1.5 block text-sm font-medium text-white">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      placeholder="your@email.com"
                      className={cn(inputClassName, errors.email && 'border-red-400/60')}
                      autoComplete="email"
                    />
                    <FieldError message={errors.email} />
                  </div>

                  <div>
                    <label htmlFor="enquiry-type" className="mb-1.5 block text-sm font-medium text-white">
                      Enquiry For <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="enquiry-type"
                      value={form.enquiryType}
                      onChange={(event) => updateField('enquiryType', event.target.value)}
                      className={cn(
                        inputClassName,
                        'cursor-pointer appearance-none bg-[#0b1220]',
                        !form.enquiryType && 'text-white/35',
                        errors.enquiryType && 'border-red-400/60',
                      )}
                    >
                      <option value="" disabled>
                        Select enquiry type
                      </option>
                      {ENQUIRY_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-[#0b1220] text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.enquiryType} />
                  </div>

                  <div>
                    <label htmlFor="enquiry-requirement" className="mb-1.5 block text-sm font-medium text-white">
                      Requirement Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="enquiry-requirement"
                      rows={6}
                      value={form.requirement}
                      onChange={(event) => updateField('requirement', event.target.value)}
                      placeholder="Describe your requirement in detail..."
                      className={cn(
                        inputClassName,
                        'resize-none',
                        errors.requirement && 'border-red-400/60',
                      )}
                    />
                    <FieldError message={errors.requirement} />
                  </div>

                  {submitError && (
                    <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                      {submitError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="mt-2 w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
