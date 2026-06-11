/**
 * ============================================================
 * GoogleAppsScript.gs — Triggrr Contact Form Backend
 * ============================================================
 *
 * WHAT THIS DOES:
 *   Receives POST requests from Contact.jsx → writes each
 *   submission as a new row in Google Sheets → emails a
 *   notification to you so you never miss a lead.
 *
 * HOW TO DEPLOY (one-time setup — ~5 minutes):
 *
 *   Step 1: Create a new Google Sheet
 *     → Name it "Triggrr Form Submissions" (or anything you like)
 *
 *   Step 2: Open Apps Script
 *     → In the Sheet: Extensions → Apps Script
 *     → Delete all existing code
 *     → Paste this entire file
 *
 *   Step 3: Configure (edit the CONFIG section below)
 *     → Set NOTIFY_EMAIL to your email
 *     → Set SHEET_NAME if you want a different tab name
 *
 *   Step 4: Deploy as Web App
 *     → Click Deploy → New Deployment
 *     → Type: Web App
 *     → Description: "Triggrr Form v1"
 *     → Execute as: Me
 *     → Who has access: Anyone
 *     → Click Deploy → Authorise (grant permissions)
 *     → Copy the Web App URL
 *
 *   Step 5: Add URL to your .env file
 *     VITE_SCRIPT_URL = [the URL you just copied]
 *
 *   Step 6: Test it
 *     → Visit the URL in your browser — you should see a JSON response
 *     → Submit the contact form on your site
 *     → Check the Google Sheet — a new row should appear
 *     → Check your email — you should receive a notification
 *
 * RE-DEPLOYING AFTER CHANGES:
 *   → Deploy → Manage Deployments → Edit → "New version" → Deploy
 *   → The URL stays the same — no need to update .env
 *
 * TROUBLESHOOTING:
 *   → Apps Script → Executions (left sidebar) shows all runs + errors
 *   → If the sheet headers are wrong: delete the "Submissions" tab,
 *     submit once, the script recreates it with correct headers
 * ============================================================
 */


// ────────────────────────────────────────────────────────────
// CONFIG — Edit these values before deploying
// ────────────────────────────────────────────────────────────

const CONFIG = {
  // Email address that receives a notification for every submission.
  // Tip: use a filter in Gmail to auto-label these "triggrr-leads".
  NOTIFY_EMAIL: 'triggrr.tech@gmail.com',

  // Name of the sheet tab where submissions are saved.
  // Created automatically if it doesn't exist.
  SHEET_NAME: 'Submissions',

  // Send a confirmation email to the person who submitted?
  // true  → they get "We received your request" immediately
  // false → no confirmation (you reply manually after review)
  SEND_CONFIRMATION: true,

  // Optional: your reCAPTCHA v3 SECRET key (different from the site key).
  // Get from: console.cloud.google.com → reCAPTCHA → your site → Settings
  // Leave empty ('') to skip server-side reCAPTCHA validation.
  RECAPTCHA_SECRET: '',

  // Minimum reCAPTCHA score to accept (0.0 = bot, 1.0 = human).
  // Submissions below this score are rejected. 0.5 is a good default.
  RECAPTCHA_MIN_SCORE: 0.5,
};


// ────────────────────────────────────────────────────────────
// COLUMN HEADERS
// These must match the keys sent from Contact.jsx.
// If you add a new form field, add its header here too.
// ────────────────────────────────────────────────────────────

const COLUMNS = [
  'Submitted At',
  'Name',
  'Email',
  'Mobile',
  'Business',
  'Industry',
  'Service',
  'Budget',
  'Timeline',
  'Challenge',
  'Source',
  'reCAPTCHA Score', // empty if reCAPTCHA not configured
];


// ────────────────────────────────────────────────────────────
// doPost — Handles form submissions from Contact.jsx
// ────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    // 1. Parse request body
    const raw  = e.postData && e.postData.contents ? e.postData.contents : '{}';
    const data = JSON.parse(raw);

    // 2. Honeypot check (belt-and-suspenders — also checked in frontend)
    if (data.website) {
      // Bot filled the hidden field. Log and pretend success.
      console.log('Honeypot triggered — bot submission blocked.');
      return jsonResponse({ success: true, message: 'OK' });
    }

    // 3. Basic required-field validation
    const required = ['name', 'email', 'business', 'industry', 'service', 'budget', 'challenge'];
    for (const field of required) {
      if (!data[field] || !String(data[field]).trim()) {
        return jsonResponse({ success: false, message: `Missing required field: ${field}` });
      }
    }

    // 4. Email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return jsonResponse({ success: false, message: 'Invalid email address.' });
    }

    // 5. Optional reCAPTCHA v3 server-side validation
    let recaptchaScore = '';
    if (CONFIG.RECAPTCHA_SECRET && data.recaptchaToken) {
      const result = verifyRecaptcha(data.recaptchaToken);
      if (!result.success) {
        console.log('reCAPTCHA failed:', JSON.stringify(result));
        return jsonResponse({ success: false, message: 'reCAPTCHA verification failed.' });
      }
      recaptchaScore = result.score;
      if (result.score < CONFIG.RECAPTCHA_MIN_SCORE) {
        console.log('reCAPTCHA score too low:', result.score);
        return jsonResponse({ success: false, message: 'Submission flagged as suspicious.' });
      }
    }

    // 6. Write to Google Sheet
    writeToSheet(data, recaptchaScore);

    // 7. Send notification email to Prabhath
    sendNotification(data);

    // 8. Send confirmation email to submitter (optional)
    if (CONFIG.SEND_CONFIRMATION) {
      sendConfirmation(data);
    }

    console.log('Submission saved:', data.name, data.email);
    return jsonResponse({ success: true, message: 'Submission received. Thank you!' });

  } catch (err) {
    console.error('doPost error:', err.toString());
    return jsonResponse({ success: false, message: 'Server error. Please try again.' });
  }
}


// ────────────────────────────────────────────────────────────
// doGet — Health check (visit the URL in a browser to test)
// ────────────────────────────────────────────────────────────

function doGet() {
  return jsonResponse({
    status:  'live',
    service: 'Triggrr Form Endpoint',
    time:    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  });
}


// ────────────────────────────────────────────────────────────
// writeToSheet — Appends a row to the Submissions sheet
// ────────────────────────────────────────────────────────────

function writeToSheet(data, recaptchaScore) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(CONFIG.SHEET_NAME);

  // Create the sheet + headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    const headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
    headerRange.setValues([COLUMNS]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#1a1a2e');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);  // Submitted At
    sheet.setColumnWidth(10, 400); // Challenge
    console.log('Created sheet:', CONFIG.SHEET_NAME);
  }

  // Build the row in COLUMNS order
  const row = [
    data.submittedAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    sanitise(data.name),
    sanitise(data.email),
    sanitise(data.mobile),
    sanitise(data.business),
    sanitise(data.industry),
    sanitise(data.service),
    sanitise(data.budget),
    sanitise(data.timeline),
    sanitise(data.challenge),
    sanitise(data.source),
    recaptchaScore,
  ];

  sheet.appendRow(row);

  // Highlight unread rows (pale yellow) — change to white once you've reviewed
  const lastRow   = sheet.getLastRow();
  const rowRange  = sheet.getRange(lastRow, 1, 1, COLUMNS.length);
  rowRange.setBackground('#fffce8');
}


// ────────────────────────────────────────────────────────────
// sendNotification — Emails Prabhath about each new submission
// ────────────────────────────────────────────────────────────

function sendNotification(data) {
  const subject =
    '\uD83E\uDD16 New Request: ' + data.name + ' \u2014 ' + data.business +
    ' \u2014 ' + data.service;

  const body = [
    'TRIGGRR \u2014 NEW AUTOMATION REQUEST',
    '='.repeat(50),
    '',
    'Submitted: ' + (data.submittedAt || new Date().toLocaleString('en-IN')),
    '',
    '\u2501'.repeat(20) + ' CONTACT ' + '\u2501'.repeat(20),
    'Name:     ' + data.name,
    'Email:    ' + data.email,
    'Mobile:   ' + (data.mobile ? '+91 ' + data.mobile : '\u2014'),
    '',
    '\u2501'.repeat(20) + ' BUSINESS ' + '\u2501'.repeat(19),
    'Name:     ' + data.business,
    'Industry: ' + data.industry,
    '',
    '\u2501'.repeat(20) + ' REQUEST ' + '\u2501'.repeat(20),
    'Service:  ' + data.service,
    'Budget:   ' + data.budget,
    'Timeline: ' + (data.timeline || 'Not specified'),
    'Source:   ' + (data.source || 'Not specified'),
    '',
    '\u2501'.repeat(20) + ' CHALLENGE ' + '\u2501'.repeat(18),
    data.challenge,
    '',
    '='.repeat(50),
    '',
    'Reply directly to this email to contact the lead.',
    'Or WhatsApp: +91 93811 49845',
    '',
    'View all submissions in Google Sheets.',
  ].join('\n');

  // replyTo is set so clicking Reply in Gmail addresses the lead directly
  GmailApp.sendEmail(
    CONFIG.NOTIFY_EMAIL,
    subject,
    body,
    { replyTo: data.email },
  );
}


// ────────────────────────────────────────────────────────────
// sendConfirmation — Emails the submitter a receipt
// ────────────────────────────────────────────────────────────

function sendConfirmation(data) {
  const subject = 'We received your request \u2014 Triggrr';

  const body = [
    'Hi ' + data.name.split(' ')[0] + ',',
    '',
    'Thanks for reaching out! We\'ve received your automation request and will',
    'review it today. Expect a reply within 24 hours with a free automation plan.',
    '',
    'Here\'s a summary of what you submitted:',
    '',
    '  Service:  ' + data.service,
    '  Business: ' + data.business,
    '  Budget:   ' + data.budget,
    '',
    'In the meantime, if you have any questions or want a faster response,',
    'you can reach us on WhatsApp: https://wa.me/919381149845',
    '',
    'Best,',
    'Prabhath',
    'Triggrr \u2014 Python & AI Automation',
    'triggrr.tech@gmail.com',
    '',
    '\u2014',
    'This is an automated confirmation. Please don\'t reply to this email.',
    'To contact us, use the WhatsApp link above.',
  ].join('\n');

  GmailApp.sendEmail(data.email, subject, body, {
    from:    CONFIG.NOTIFY_EMAIL,
    name:    'Prabhath from Triggrr',
    replyTo: CONFIG.NOTIFY_EMAIL,
  });
}


// ────────────────────────────────────────────────────────────
// verifyRecaptcha — Server-side reCAPTCHA v3 check (optional)
// ────────────────────────────────────────────────────────────

function verifyRecaptcha(token) {
  try {
    const url      = 'https://www.google.com/recaptcha/api/siteverify';
    const payload  = 'secret=' + CONFIG.RECAPTCHA_SECRET + '&response=' + token;
    const options  = {
      method:      'post',
      contentType: 'application/x-www-form-urlencoded',
      payload:     payload,
      muteHttpExceptions: true,
    };
    const response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  } catch (err) {
    console.error('reCAPTCHA verification error:', err.toString());
    // On error, allow the submission through (graceful degradation)
    return { success: true, score: 1.0 };
  }
}


// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────

/**
 * Strips HTML tags and trims the value.
 * Prevents script injection into the spreadsheet.
 */
function sanitise(value) {
  if (!value) return '';
  return String(value)
    .replace(/<[^>]*>/g, '')   // strip HTML tags
    .replace(/=/g, '')         // prevent CSV formula injection
    .trim()
    .substring(0, 2000);       // cap at 2000 chars
}

/**
 * Returns a JSON text response.
 * Apps Script doPost/doGet must return ContentService output.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
