import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTIFY_EMAIL_USER,
    pass: process.env.NOTIFY_EMAIL_PASS,
  },
});

/**
 * Send wholesale inquiry notification email
 */
export async function sendInquiryEmail(inquiry) {
  const {
    companyName,
    contactPersonName,
    phoneNumber,
    email,
    city,
    country,
    businessType,
    quantityRequired,
    customisationRequirement,
    specialInstructions,
  } = inquiry;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1F1951 0%, #801830 100%); padding: 28px 32px;">
        <h1 style="color: #fff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">New Wholesale Inquiry</h1>
        <p style="color: rgba(255,255,255,0.6); margin: 6px 0 0; font-size: 12px; font-family: Arial, sans-serif; text-transform: uppercase; letter-spacing: 1px;">Jaipur Kurti Gharana</p>
      </div>

      <!-- Accent line -->
      <div style="height: 3px; background: linear-gradient(to right, #E13C6C, #801830, #1F1951);"></div>

      <!-- Body -->
      <div style="padding: 28px 32px;">

        <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 13px;">
          <tr>
            <td colspan="2" style="padding: 0 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-weight: bold;">Contact Details</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; color: #6b7280; width: 40%;">Company</td>
            <td style="padding: 10px 14px; color: #111827; font-weight: 600;">${companyName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #6b7280;">Contact Person</td>
            <td style="padding: 10px 14px; color: #111827;">${contactPersonName}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; color: #6b7280;">Phone / WhatsApp</td>
            <td style="padding: 10px 14px; color: #111827;">${phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #6b7280;">Email</td>
            <td style="padding: 10px 14px; color: #111827;">${email}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; color: #6b7280;">Location</td>
            <td style="padding: 10px 14px; color: #111827;">${city}, ${country}</td>
          </tr>

          <tr>
            <td colspan="2" style="padding: 24px 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-weight: bold;">Order Details</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; color: #6b7280;">Business Type</td>
            <td style="padding: 10px 14px; color: #111827;">${businessType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; color: #6b7280;">Quantity Required</td>
            <td style="padding: 10px 14px; color: #111827; font-weight: 600;">${quantityRequired}</td>
          </tr>
          <tr style="background: #f9fafb;">
            <td style="padding: 10px 14px; color: #6b7280;">Customisation</td>
            <td style="padding: 10px 14px; color: #111827;">${customisationRequirement}</td>
          </tr>
          ${specialInstructions ? `
          <tr>
            <td style="padding: 10px 14px; color: #6b7280; vertical-align: top;">Special Instructions</td>
            <td style="padding: 10px 14px; color: #111827;">${specialInstructions}</td>
          </tr>` : ''}
        </table>

        <!-- CTA -->
        <div style="margin-top: 28px; padding: 16px; background: #fdf2f8; border-left: 4px solid #E13C6C; border-radius: 4px;">
          <p style="margin: 0; font-family: Arial, sans-serif; font-size: 13px; color: #374151;">
            <strong>Action required:</strong> Log in to the admin panel to view and respond to this inquiry.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding: 16px 32px; background: #f9fafb; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; font-family: Arial, sans-serif; font-size: 11px; color: #9ca3af; text-align: center;">
          Jaipur Kurti Gharana · Automated Inquiry Notification
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"JKG Inquiries" <${process.env.NOTIFY_EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL_TO,
    subject: `New Wholesale Inquiry — ${companyName} (${city}, ${country})`,
    html,
  });
}
