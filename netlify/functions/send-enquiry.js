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

function maskSecret(value) {
  if (!value) return 'NOT SET';
  if (value.length <= 8) return 'set (hidden)';
  return `set (${value.slice(0, 7)}…, length ${value.length})`;
}

/**
 * Reads Resend/email env vars from process.env.
 *
 * Expected location:
 * - Production: Netlify → Site configuration → Environment variables
 * - Local: project root `.env` when running `netlify dev`
 *
 * Required keys (exact names, no VITE_ prefix):
 * - RESEND_API_KEY
 * - ENQUIRY_FROM_EMAIL
 * - ENQUIRY_TO_EMAIL
 */
function validateEnvironment() {
  console.log('[send-enquiry] Validating environment variables…');

  const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim() || '';
  const ENQUIRY_FROM_EMAIL = process.env.ENQUIRY_FROM_EMAIL?.trim() || '';
  const ENQUIRY_TO_EMAIL = process.env.ENQUIRY_TO_EMAIL?.trim() || '';

  const relatedEnvKeys = Object.keys(process.env).filter((key) =>
    /RESEND|ENQUIRY|EMAIL/i.test(key),
  );

  console.log('[send-enquiry] process.env.RESEND_API_KEY:', maskSecret(RESEND_API_KEY));
  console.log('[send-enquiry] process.env.ENQUIRY_FROM_EMAIL:', ENQUIRY_FROM_EMAIL || 'NOT SET');
  console.log('[send-enquiry] process.env.ENQUIRY_TO_EMAIL:', ENQUIRY_TO_EMAIL || 'NOT SET');
  console.log(
    '[send-enquiry] Related env keys in runtime:',
    relatedEnvKeys.length > 0 ? relatedEnvKeys.join(', ') : 'none',
  );

  const configErrors = [];

  if (!RESEND_API_KEY) {
    configErrors.push('RESEND_API_KEY environment variable is not configured.');
  } else if (!RESEND_API_KEY.startsWith('re_')) {
    configErrors.push(
      'RESEND_API_KEY appears invalid. Resend API keys must start with "re_".',
    );
  }

  if (!ENQUIRY_FROM_EMAIL) {
    configErrors.push('ENQUIRY_FROM_EMAIL environment variable is not configured.');
  }

  if (!ENQUIRY_TO_EMAIL) {
    configErrors.push('ENQUIRY_TO_EMAIL environment variable is not configured.');
  }

  if (configErrors.length > 0) {
    console.error('[send-enquiry] Configuration errors:', configErrors);
  } else {
    console.log('[send-enquiry] Environment validation passed.');
  }

  return {
    configErrors,
    RESEND_API_KEY,
    ENQUIRY_FROM_EMAIL,
    ENQUIRY_TO_EMAIL,
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

  const env = validateEnvironment();

  if (env.configErrors.length > 0) {
    return jsonResponse(500, {
      error: env.configErrors[0],
      configErrors: env.configErrors,
      hint: 'Set variables in Netlify → Site configuration → Environment variables, then redeploy.',
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
    // Resend reads the API key from process.env.RESEND_API_KEY (passed explicitly here).
    console.log('[send-enquiry] Initializing Resend client with process.env.RESEND_API_KEY');
    const resend = new Resend(env.RESEND_API_KEY);

    console.log('[send-enquiry] Sending email via Resend…', {
      from: env.ENQUIRY_FROM_EMAIL,
      to: env.ENQUIRY_TO_EMAIL,
      replyTo: email,
    });

    const { data, error } = await resend.emails.send({
      from: env.ENQUIRY_FROM_EMAIL,
      to: env.ENQUIRY_TO_EMAIL,
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

    if (error) {
      console.error('[send-enquiry] Resend API error:', error);
      return jsonResponse(500, {
        error: error.message || 'Failed to send enquiry. Please try again.',
        provider: 'resend',
      });
    }

    console.log('[send-enquiry] Email sent successfully. Resend id:', data?.id || 'unknown');
    return jsonResponse(200, { success: true, id: data?.id });
  } catch (error) {
    console.error('[send-enquiry] Unexpected Resend error:', error);
    return jsonResponse(500, {
      error: error instanceof Error ? error.message : 'Failed to send enquiry. Please try again.',
      provider: 'resend',
    });
  }
}
