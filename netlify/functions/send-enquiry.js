/* eslint-env node */
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ENQUIRY_OPTIONS = [
  'Shopify Store Redesign',
  'Website Audit',
  'Bug Fixing',
  'Store Setup From Scratch',
  'Custom Shopify App Development',
  'Website Development',
  'AI Automation',
  'Collection Tree App Support',
  'Store Radar App Support',
  'WordPress Development',
  'Other',
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

function validatePayload(data) {
  const errors = {};

  if (!data.name?.trim()) errors.name = 'Full name is required';

  const whatsapp = data.whatsapp?.trim() ?? '';
  const whatsappDigits = whatsapp.replace(/\D/g, '');
  if (!whatsapp) {
    errors.whatsapp = 'WhatsApp number is required';
  } else if (whatsappDigits.length < 10) {
    errors.whatsapp = 'Enter a valid WhatsApp number';
  } else if (!/^[\d+\s-]+$/.test(whatsapp)) {
    errors.whatsapp = 'Numbers only';
  }

  if (!data.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.enquiryType || !ENQUIRY_OPTIONS.includes(data.enquiryType)) {
    errors.enquiryType = 'Please select a valid enquiry type';
  }

  if (!data.requirement?.trim()) {
    errors.requirement = 'Please describe your requirement';
  }

  return errors;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailHtml({ name, whatsapp, email, enquiryType, requirement, submissionDate }) {
  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin: 0 0 16px; color: #0f172a;">New Website Enquiry - Ananta One</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tr><td style="padding: 8px 0; font-weight: 600;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">WhatsApp</td><td style="padding: 8px 0;">${escapeHtml(whatsapp)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Email</td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Enquiry For</td><td style="padding: 8px 0;">${escapeHtml(enquiryType)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Requirement</td><td style="padding: 8px 0; white-space: pre-wrap;">${escapeHtml(requirement)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600;">Submitted</td><td style="padding: 8px 0;">${escapeHtml(submissionDate)}</td></tr>
      </table>
    </div>
  `;
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL } = process.env;

  if (!RESEND_API_KEY || !ENQUIRY_FROM_EMAIL || !ENQUIRY_TO_EMAIL) {
    return jsonResponse(500, {
      error: 'Email service is not configured. Contact the site administrator.',
    });
  }

  let payload;

  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return jsonResponse(400, { error: 'Invalid request body' });
  }

  const errors = validatePayload(payload);
  if (Object.keys(errors).length > 0) {
    return jsonResponse(400, { error: 'Validation failed', errors });
  }

  const name = payload.name.trim();
  const whatsapp = payload.whatsapp.trim();
  const email = payload.email.trim();
  const enquiryType = payload.enquiryType;
  const requirement = payload.requirement.trim();
  const submissionDate = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  try {
    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: ENQUIRY_FROM_EMAIL,
      to: ENQUIRY_TO_EMAIL,
      replyTo: email,
      subject: 'New Website Enquiry - Ananta One',
      html: buildEmailHtml({
        name,
        whatsapp,
        email,
        enquiryType,
        requirement,
        submissionDate,
      }),
    });

    return jsonResponse(200, { success: true });
  } catch (error) {
    console.error('Resend enquiry error:', error);
    return jsonResponse(500, {
      error: 'Failed to send enquiry. Please try again.',
    });
  }
}
