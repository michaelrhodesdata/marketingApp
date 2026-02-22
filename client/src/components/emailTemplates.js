// Email-safe HTML templates
// Each template has:
//   defaultBody: initial Quill content (HTML)
//   wrap(bodyHtml): wraps the body HTML in the full email template

const BASE_URL = 'https://dealer-app-429993829712.us-central1.run.app';
const LOGO_WHITE = `${BASE_URL}/revusup-logo-white.png`;
const LOGO_BLACK = `${BASE_URL}/revusup-logo-black.png`;
const REVUSUP_URL = 'https://www.revusup.com';

const footer = (dark = false) => `
<tr>
  <td style="background:${dark ? '#1a1a1a' : '#f8f8f8'};padding:20px 32px;border-radius:0 0 8px 8px;text-align:center;">
    <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;">
      <img src="${LOGO_BLACK}" alt="Revusup" width="120" style="display:inline-block;margin-bottom:8px;opacity:${dark ? '0' : '1'};" />
    </a>
    ${dark ? `<br><a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;"><img src="${LOGO_WHITE}" alt="Revusup" width="120" style="display:inline-block;margin-bottom:8px;" /></a>` : ''}
    <p style="margin:4px 0 0;font-size:11px;color:${dark ? '#666' : '#999'};">
      Powered by <a href="${REVUSUP_URL}" target="_blank" style="color:#EB0A1E;text-decoration:none;font-weight:600;">Revusup.com</a>
      &nbsp;·&nbsp; Automotive Dealer Solutions
    </p>
    <p style="margin:4px 0 0;font-size:10px;color:${dark ? '#555' : '#bbb'};">
      © ${new Date().getFullYear()} Revusup. All rights reserved.
    </p>
  </td>
</tr>`;

export const TEMPLATES = {
  professional: {
    defaultBody: '<p>Dear Toyota Dealer Partner,</p><p><br></p><p>We hope this message finds you well. We wanted to reach out with an important update regarding our dealer network.</p><p><br></p><p>Please review the information below and don\'t hesitate to contact us if you have any questions.</p><p><br></p><p>Best regards,<br>The Revusup Team</p>',
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#EB0A1E;padding:20px 32px;border-radius:8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;">
                    <img src="${LOGO_WHITE}" alt="Revusup" height="36" style="display:block;" />
                  </a>
                </td>
                <td align="right">
                  <a href="${REVUSUP_URL}" target="_blank" style="color:rgba(255,255,255,0.8);font-size:12px;text-decoration:none;">revusup.com →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
            <div style="color:#333333;font-size:15px;line-height:1.7;">
              ${body}
            </div>
          </td>
        </tr>
        ${footer(false)}
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
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:20px 0;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">
        <!-- Header Banner -->
        <tr>
          <td style="background:#1a1a1a;padding:0;border-radius:8px 8px 0 0;overflow:hidden;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#EB0A1E;padding:12px 20px;width:200px;">
                  <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;">
                    <img src="${LOGO_WHITE}" alt="Revusup" height="32" style="display:block;" />
                  </a>
                </td>
                <td style="background:#1a1a1a;padding:14px 24px;">
                  <span style="color:#fff;font-size:16px;font-family:Arial,sans-serif;font-weight:300;letter-spacing:1px;">DEALER NEWSLETTER</span>
                </td>
                <td style="background:#1a1a1a;padding:14px 24px;" align="right">
                  <span style="color:#888;font-size:11px;font-family:Arial,sans-serif;">${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Two-column layout -->
        <tr>
          <td style="background:#ffffff;padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <!-- Main content -->
                <td style="padding:28px 24px;width:68%;vertical-align:top;border-right:1px solid #eee;">
                  <div style="color:#222;font-size:14px;line-height:1.8;">${body}</div>
                </td>
                <!-- Sidebar -->
                <td style="padding:28px 20px;width:32%;vertical-align:top;background:#fafafa;">
                  <div style="font-family:Arial,sans-serif;">
                    <p style="font-size:12px;font-weight:700;color:#EB0A1E;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">Quick Links</p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}" target="_blank" style="color:#333;text-decoration:none;">→ Revusup.com</a></p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}/dealers" target="_blank" style="color:#333;text-decoration:none;">→ Dealer Portal</a></p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}/solutions" target="_blank" style="color:#333;text-decoration:none;">→ Our Solutions</a></p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="${REVUSUP_URL}/contact" target="_blank" style="color:#333;text-decoration:none;">→ Contact Us</a></p>
                    <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
                    <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;">
                      <img src="${LOGO_BLACK}" alt="Revusup" width="100" style="display:block;margin-bottom:8px;" />
                    </a>
                    <p style="font-size:11px;color:#999;line-height:1.5;margin:0;">Automotive Dealer Solutions</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ${footer(true)}
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
        <!-- Hero banner -->
        <tr>
          <td style="background:linear-gradient(135deg,#EB0A1E 0%,#c00018 100%);padding:40px 32px;text-align:center;border-radius:8px 8px 0 0;">
            <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;">
              <img src="${LOGO_WHITE}" alt="Revusup" height="42" style="display:inline-block;margin-bottom:16px;" />
            </a>
            <p style="margin:0;color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:3px;text-transform:uppercase;">Official Communication</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:11px;">
              <a href="${REVUSUP_URL}" target="_blank" style="color:rgba(255,255,255,0.7);text-decoration:none;">revusup.com</a>
            </p>
          </td>
        </tr>
        <!-- Divider accent -->
        <tr>
          <td style="background:#fff;padding:0;">
            <div style="height:4px;background:linear-gradient(90deg,#EB0A1E,#ff6b6b,#EB0A1E);"></div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;">
            <div style="color:#222;font-size:15px;line-height:1.75;">
              ${body}
            </div>
            <!-- CTA Button -->
            <div style="text-align:center;margin-top:32px;">
              <a href="${REVUSUP_URL}" target="_blank" style="display:inline-block;background:#EB0A1E;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:6px;letter-spacing:0.5px;">Visit Revusup.com →</a>
            </div>
          </td>
        </tr>
        ${footer(true)}
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
        <!-- Simple header -->
        <tr>
          <td style="padding-bottom:20px;border-bottom:2px solid #EB0A1E;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <a href="${REVUSUP_URL}" target="_blank" style="text-decoration:none;">
                    <img src="${LOGO_BLACK}" alt="Revusup" height="28" style="display:block;" />
                  </a>
                </td>
                <td align="right">
                  <a href="${REVUSUP_URL}" target="_blank" style="color:#EB0A1E;font-size:12px;text-decoration:none;font-weight:600;">revusup.com →</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 0;color:#333;font-size:14px;line-height:1.8;">
            ${body}
          </td>
        </tr>
        <!-- Simple footer -->
        <tr>
          <td style="padding-top:20px;border-top:1px solid #eee;color:#aaa;font-size:11px;line-height:1.6;">
            Powered by <a href="${REVUSUP_URL}" target="_blank" style="color:#EB0A1E;text-decoration:none;font-weight:600;">Revusup.com</a> · Automotive Dealer Solutions<br>
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
