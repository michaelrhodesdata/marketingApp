const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: parseInt(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// GET /api/email/recipients?state=TX
// Returns list of dealers with emails (from main dealer CSV)
router.get('/recipients', (req, res) => {
  const { state } = req.query;
  let dealers = req.app.locals.dealers;

  if (state) {
    const states = state.split(',').map(s => s.trim().toUpperCase());
    dealers = dealers.filter(d => d.state && states.includes(d.state.toUpperCase()));
  }

  const recipients = dealers
    .filter(d => d.email && d.email.trim())
    .map(d => ({
      dealer_code: d.dealer_code,
      name: d.name,
      email: d.email.trim(),
      city: d.city,
      state: d.state,
    }));

  res.json({ count: recipients.length, recipients });
});

// POST /api/email/upload — upload image, return base64 data URL
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const base64 = req.file.buffer.toString('base64');
  const dataUrl = `data:${req.file.mimetype};base64,${base64}`;
  res.json({ url: dataUrl, name: req.file.originalname });
});

// POST /api/email/send
// Body (multipart): subject, html, recipients (JSON string), attachments[]
router.post('/send', upload.array('attachments', 20), async (req, res) => {
  const { subject, html, recipients: recipientsJson } = req.body;

  if (!subject || !html || !recipientsJson) {
    return res.status(400).json({ error: 'subject, html, and recipients are required' });
  }

  let recipients;
  try {
    recipients = JSON.parse(recipientsJson);
  } catch {
    return res.status(400).json({ error: 'Invalid recipients JSON' });
  }

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: 'No recipients provided' });
  }

  const transporter = getTransporter();

  // Build attachments from uploaded files
  const attachments = (req.files || []).map(file => ({
    filename: file.originalname,
    content: file.buffer,
    contentType: file.mimetype,
  }));

  let sent = 0;
  let failed = 0;
  const errors = [];

  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: recipient.email,
        subject,
        html,
        attachments,
      });
      sent++;
    } catch (err) {
      failed++;
      errors.push({ email: recipient.email, error: err.message });
    }
    // Rate limit: 200ms between sends
    if (recipients.indexOf(recipient) < recipients.length - 1) {
      await sleep(200);
    }
  }

  res.json({ sent, failed, errors: errors.slice(0, 20) });
});

// POST /api/email/test — send a single test email
router.post('/test', express.json(), async (req, res) => {
  const { to, subject, html } = req.body;
  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'to, subject, and html are required' });
  }
  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
