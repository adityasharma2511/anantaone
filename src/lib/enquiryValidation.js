const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEnquiryForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Full name is required';
  }

  const whatsappDigits = values.whatsapp.replace(/\D/g, '');
  if (!values.whatsapp.trim()) {
    errors.whatsapp = 'WhatsApp number is required';
  } else if (whatsappDigits.length < 10) {
    errors.whatsapp = 'Enter a valid WhatsApp number';
  } else if (!/^[\d+\s-]+$/.test(values.whatsapp.trim())) {
    errors.whatsapp = 'Numbers only';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.enquiryType) {
    errors.enquiryType = 'Please select an enquiry type';
  }

  if (!values.requirement.trim()) {
    errors.requirement = 'Please describe your requirement';
  }

  return errors;
}
