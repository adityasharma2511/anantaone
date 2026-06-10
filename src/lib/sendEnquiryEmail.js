const API_URL = import.meta.env.VITE_ENQUIRY_API_URL || '/api/enquiry';

export async function sendEnquiryEmail(formData) {
  const payload = {
    name: formData.name.trim(),
    whatsapp: formData.whatsapp.trim(),
    email: formData.email.trim(),
    enquiryType: formData.enquiryType,
    requirement: formData.requirement.trim(),
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    const message =
      data.error ||
      (Array.isArray(data.configErrors) ? data.configErrors.join(' ') : null) ||
      'Something went wrong. Please try again.';
    throw new Error(message);
  }

  return data;
}
