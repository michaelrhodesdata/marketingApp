// Email-safe HTML templates

const REVUSUP_URL = 'https://www.revusup.com';
const BLUE = '#1a56db';
const BLUE_DARK = '#1344b0';

const revusupHeader = () => `
<tr>
  <td style="background:${BLUE};padding:18px 32px;border-radius:8px 8px 0 0;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;font-family:Arial,sans-serif;">Revusup.com</a>
        </td>
        <td align="right">
          <a href="${REVUSUP_URL}" target="_blank" style="color:rgba(255,255,255,0.8);font-size:12px;text-decoration:none;font-family:Arial,sans-serif;">Visit us →</a>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

const revusupTagline = () => `
<tr>
  <td style="background:#f0f5ff;padding:20px 32px;border-left:4px solid ${BLUE};margin:0;">
    <p style="margin:0 0 6px;font-size:16px;font-weight:700;color:#111;font-family:Arial,sans-serif;">Tired of Endless Spreadsheets?</p>
    <p style="margin:0 0 12px;font-size:13px;color:#444;line-height:1.6;font-family:Arial,sans-serif;">We were too. That's why we built a CRM made for dealership service departments — one that turns disconnected data into clear insights. No more guesswork, manual tracking, or hours lost piecing reports together.</p>
    <a href="${REVUSUP_URL}" target="_blank" style="display:inline-block;background:${BLUE};color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:9px 20px;border-radius:5px;font-family:Arial,sans-serif;">Learn More at Revusup.com →</a>
  </td>
</tr>`;

const revusupFooter = () => `
<tr>
  <td style="background:#f8f8f8;padding:16px 32px;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 8px 8px;text-align:center;">
    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:12px;color:#555;">
      Powered by <a href="${REVUSUP_URL}" target="_blank" style="color:${BLUE};text-decoration:none;font-weight:700;">Revusup.com</a> · Dealership CRM & Analytics
    </p>
    <p style="margin:0;font-size:10px;color:#bbb;font-family:Arial,sans-serif;">© ${new Date().getFullYear()} Revusup. All rights reserved.</p>
  </td>
</tr>`;

export const TEMPLATES = {
  professional: {
    defaultBody: `<p>Dear Toyota Dealer Partner,</p><p><br></p><p>Let's be honest — managing a dealership service department is hard enough without wrestling spreadsheets, chasing down reports, and wondering why customers aren't coming back.</p><p><br></p><p>We felt that frustration firsthand. So we built something better.</p><p><br></p><p><strong>Introducing Revusup</strong> — the CRM built specifically for dealership service departments. We turn your disconnected data into clear, actionable insights so your team can stop guessing and start growing.</p><p><br></p><p><strong>The results speak for themselves:</strong></p><p>✅ 40% Increase in Customer Retention</p><p>✅ 2.5x Faster Processing</p><p>✅ 98% Customer Satisfaction</p><p><br></p><p><strong>━━━━━━━━━━━━━━━━━━━━━━</strong></p><p><strong>SEE EVERY OFFER. EVERY CALL. EVERY INTERACTION.</strong></p><p><strong>━━━━━━━━━━━━━━━━━━━━━━</strong></p><p>All in one place — so you always know what's working and where to improve. No more manual tracking. No more hours lost piecing reports together. Just clarity.</p><p><br></p><p><strong>Here's what Revusup brings to your service department:</strong></p><p><br></p><p>📊 <strong>Real-Time Analytics</strong> — Instant insights with comprehensive dashboards so you're never flying blind.</p><p>👤 <strong>Customer Management</strong> — Track every interaction, preference, and service history to deliver experiences that keep customers coming back.</p><p>🎯 <strong>Offer Management</strong> — Create, assign, and track service offers with smart workflow automation that does the heavy lifting for you.</p><p>📞 <strong>Outbound Campaigns</strong> — Manage your outbound call queues with priority-based routing so your team always knows who to call next.</p><p>📋 <strong>Automated Reports</strong> — Monthly and acceptance reports generated automatically — no manual work required.</p><p>⚠️ <strong>Risk Assessment</strong> — Identify at-risk customers before they leave and take proactive steps to retain them.</p><p><br></p><p><strong>Getting started is simple:</strong></p><p><br></p><p>1️⃣ <strong>Connect Your Data</strong> — We integrate seamlessly with your existing systems.</p><p>2️⃣ <strong>Monitor &amp; Manage</strong> — Use our intuitive dashboards to track performance in real time.</p><p>3️⃣ <strong>Grow Your Business</strong> — Let data-driven insights and automation do what they're designed to do.</p><p><br></p><p>Your associates deserve a fighting chance to secure every appointment. Your service department deserves data that actually makes sense. And your business deserves the growth that comes with it.</p><p><br></p><p>We built Revusup out of frustration and engineered it for clarity — and we'd love to show you what it can do for your team.</p><p><br></p><p>👉 <strong>Follow the link below to Schedule a Free Demo and let's talk.</strong></p><p><br></p><p><em>Smarter tracking. Faster service. Effortless growth.</em></p><p><br></p><p>Let's build something great together.</p><p><br></p><p>Best regards,<br>The Revusup Team</p>`,
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        ${revusupHeader()}
        <tr>
          <td style="background:#ffffff;padding:32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
            <div style="color:#333333;font-size:15px;line-height:1.7;">${body}</div>
          </td>
        </tr>
        ${revusupTagline()}
        ${revusupFooter()}
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },

  newsletter: {
    defaultBody: '<h2>This Month\'s Highlights</h2><p>Welcome to the Revusup Dealer Newsletter. Here\'s what\'s new this month:</p><ul><li>New model year updates</li><li>Sales incentive programs</li><li>Training opportunities</li></ul><p><br></p><h3>Featured Program</h3><p>Learn about our latest dealer support initiatives designed to help you grow your business and serve customers better.</p>',
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:20px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">
        ${revusupHeader()}
        <!-- Subheader -->
        <tr>
          <td style="background:#1344b0;padding:10px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td><span style="color:#fff;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">DEALER NEWSLETTER</span></td>
                <td align="right"><span style="color:rgba(255,255,255,0.6);font-size:11px;font-family:Arial,sans-serif;">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span></td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Two-column layout -->
        <tr>
          <td style="background:#ffffff;padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 24px;width:66%;vertical-align:top;border-right:1px solid #eee;">
                  <div style="color:#222;font-size:14px;line-height:1.8;">${body}</div>
                </td>
                <td style="padding:28px 20px;width:34%;vertical-align:top;background:#fafafa;">
                  <p style="font-size:12px;font-weight:700;color:${BLUE};text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Quick Links</p>
                  <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}" target="_blank" style="color:#333;text-decoration:none;">→ Revusup.com</a></p>
                  <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}/demo" target="_blank" style="color:#333;text-decoration:none;">→ Schedule a Demo</a></p>
                  <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}/solutions" target="_blank" style="color:#333;text-decoration:none;">→ Our Solutions</a></p>
                  <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}/contact" target="_blank" style="color:#333;text-decoration:none;">→ Contact Us</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ${revusupTagline()}
        ${revusupFooter()}
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },

  announcement: {
    defaultBody: '<h2 style="text-align:center;">Important Announcement</h2><p style="text-align:center;">We have exciting news to share with all Toyota dealer partners.</p><p><br></p><p>This is a critical update that affects your dealership operations. Please read the following information carefully and take action as needed.</p><p><br></p><p style="text-align:center;"><strong>Action Required by: [DATE]</strong></p>',
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        ${revusupHeader()}
        <!-- Hero accent bar -->
        <tr><td style="background:${BLUE_DARK};padding:6px 32px;">
          <span style="color:rgba(255,255,255,0.7);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Official Communication</span>
        </td></tr>
        <tr>
          <td style="background:#ffffff;padding:36px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
            <div style="color:#222;font-size:15px;line-height:1.75;">${body}</div>
            <div style="text-align:center;margin-top:32px;">
              <a href="${REVUSUP_URL}" target="_blank" style="display:inline-block;background:${BLUE};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:6px;">Visit Revusup.com →</a>
            </div>
          </td>
        </tr>
        ${revusupTagline()}
        ${revusupFooter()}
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },

  simple: {
    defaultBody: '<p>Hello,</p><p><br></p><p>I hope this email finds you well.</p><p><br></p><p>[Your message here]</p><p><br></p><p>Thank you,<br>The Revusup Team</p>',
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:32px;" align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td style="padding-bottom:16px;border-bottom:3px solid ${BLUE};">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td><a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;color:${BLUE};font-size:20px;font-weight:700;font-family:Arial,sans-serif;">Revusup.com</a></td>
                <td align="right"><a href="${REVUSUP_URL}" target="_blank" style="color:${BLUE};font-size:12px;text-decoration:none;">Visit us →</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 0;color:#333;font-size:14px;line-height:1.8;">${body}</td>
        </tr>
        <!-- Tagline block -->
        <tr>
          <td style="background:#f0f5ff;padding:16px 20px;border-left:4px solid ${BLUE};border-radius:0 4px 4px 0;margin-bottom:20px;">
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#111;">Tired of Endless Spreadsheets?</p>
            <p style="margin:0 0 10px;font-size:12px;color:#555;line-height:1.6;">We were too. That's why we built a CRM made for dealership service departments — one that turns disconnected data into clear insights.</p>
            <a href="${REVUSUP_URL}" target="_blank" style="color:${BLUE};font-size:12px;font-weight:600;text-decoration:none;">Learn More →</a>
          </td>
        </tr>
        <tr><td style="padding-top:4px;"></td></tr>
        <tr>
          <td style="padding-top:16px;border-top:1px solid #eee;color:#bbb;font-size:11px;line-height:1.6;">
            Powered by <a href="${REVUSUP_URL}" target="_blank" style="color:${BLUE};text-decoration:none;font-weight:600;">Revusup.com</a> · Dealership CRM & Analytics<br>
            © ${new Date().getFullYear()} Revusup. All rights reserved.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
};
