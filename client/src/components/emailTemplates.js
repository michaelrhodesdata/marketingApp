// Email-safe HTML templates
// Each template has:
//   defaultBody: initial Quill content (HTML)
//   wrap(bodyHtml): wraps the body HTML in the full email template

export const TEMPLATES = {
  professional: {
    defaultBody: '<p>Dear Toyota Dealer Partner,</p><p><br></p><p>We hope this message finds you well. We wanted to reach out with an important update regarding our dealer network.</p><p><br></p><p>Please review the information below and don\'t hesitate to contact us if you have any questions.</p><p><br></p><p>Best regards,<br>Toyota Dealer Relations Team</p>',
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background:#EB0A1E;padding:24px 32px;border-radius:8px 8px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:2px;">TOYOTA</span>
                </td>
                <td align="right">
                  <span style="color:rgba(255,255,255,0.8);font-size:12px;">Dealer Communications</span>
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
        <!-- Footer -->
        <tr>
          <td style="background:#f8f8f8;padding:20px 32px;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 8px 8px;">
            <p style="margin:0;font-size:11px;color:#999;text-align:center;">
              © ${new Date().getFullYear()} Toyota Motor Sales, U.S.A., Inc. | Toyota Dealer Network<br>
              This email was sent to Toyota dealer partners.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },

  newsletter: {
    defaultBody: '<h2>This Month\'s Highlights</h2><p>Welcome to the Toyota Dealer Newsletter. Here\'s what\'s new this month:</p><ul><li>New model year updates</li><li>Sales incentive programs</li><li>Training opportunities</li></ul><p><br></p><h3>Featured Program</h3><p>Learn about our latest dealer support initiatives designed to help you grow your business and serve customers better.</p>',
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
                <td style="background:#EB0A1E;padding:14px 24px;width:180px;">
                  <span style="color:#fff;font-size:20px;font-weight:700;font-family:Arial,sans-serif;letter-spacing:2px;">TOYOTA</span>
                </td>
                <td style="background:#1a1a1a;padding:14px 24px;">
                  <span style="color:#fff;font-size:18px;font-family:Arial,sans-serif;font-weight:300;">DEALER NEWSLETTER</span>
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
                    <p style="font-size:13px;margin:0 0 8px;"><a href="#" style="color:#333;text-decoration:none;">→ Dealer Portal</a></p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="#" style="color:#333;text-decoration:none;">→ Training Center</a></p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="#" style="color:#333;text-decoration:none;">→ Marketing Hub</a></p>
                    <p style="font-size:13px;margin:0 0 8px;"><a href="#" style="color:#333;text-decoration:none;">→ Parts & Service</a></p>
                    <hr style="border:none;border-top:1px solid #eee;margin:16px 0;">
                    <p style="font-size:12px;font-weight:700;color:#EB0A1E;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Contact Us</p>
                    <p style="font-size:12px;color:#666;line-height:1.6;margin:0;">dealer.support@toyota.com<br>1-800-331-4331</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#1a1a1a;padding:16px 24px;border-radius:0 0 8px 8px;">
            <p style="margin:0;font-size:11px;color:#666;text-align:center;font-family:Arial,sans-serif;">
              © ${new Date().getFullYear()} Toyota Motor Sales, U.S.A., Inc. All rights reserved.
            </p>
          </td>
        </tr>
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
          <td style="background:linear-gradient(135deg,#EB0A1E 0%,#c00018 100%);padding:48px 32px;text-align:center;border-radius:8px 8px 0 0;">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.7);font-size:12px;letter-spacing:3px;text-transform:uppercase;">Toyota Dealer Network</p>
            <h1 style="margin:0 0 12px;color:#ffffff;font-size:32px;font-weight:900;letter-spacing:1px;line-height:1.2;">TOYOTA</h1>
            <p style="margin:0;color:rgba(255,255,255,0.85);font-size:14px;letter-spacing:2px;text-transform:uppercase;">Official Communication</p>
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
              <a href="#" style="display:inline-block;background:#EB0A1E;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:6px;letter-spacing:0.5px;">Learn More →</a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#222;padding:20px 32px;border-radius:0 0 8px 8px;text-align:center;">
            <p style="margin:0 0 4px;color:#fff;font-size:13px;font-weight:700;letter-spacing:1px;">TOYOTA MOTOR SALES</p>
            <p style="margin:0;font-size:11px;color:#888;">© ${new Date().getFullYear()} Toyota Motor Sales, U.S.A., Inc.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },

  simple: {
    defaultBody: '<p>Hello,</p><p><br></p><p>I hope this email finds you well.</p><p><br></p><p>[Your message here]</p><p><br></p><p>Thank you,<br>Toyota Dealer Relations</p>',
    wrap: (body) => `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td style="padding:32px;" align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <!-- Simple header -->
        <tr>
          <td style="padding-bottom:24px;border-bottom:2px solid #EB0A1E;">
            <span style="font-size:16px;font-weight:700;color:#EB0A1E;letter-spacing:2px;">TOYOTA</span>
            <span style="font-size:13px;color:#888;margin-left:12px;">Dealer Relations</span>
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
            Toyota Motor Sales, U.S.A., Inc.<br>
            © ${new Date().getFullYear()} All rights reserved.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  },
};
