const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email with a video attachment
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Email body text
 * @param {string} options.videoPath - Path to the video file
 * @returns {Promise} - Resolves when email is sent
 */
async function sendVideoEmail({ to, subject, text, videoPath }) {
  try {
    // Check if the video file exists
    if (!fs.existsSync(videoPath)) {
      throw new Error(`Video file not found: ${videoPath}`);
    }

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: text || 'Please see the attached video message.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #ff69b4; text-align: center;">You've received a video message! ❤️</h2>
          <p style="line-height: 1.6;">${text || 'Someone has sent you a special video message.'}</p>
          <p style="line-height: 1.6;">Please check the attachment to view your video.</p>
          <div style="margin: 30px 0; text-align: center; color: #ff69b4;">
            <p>💖 SAILUUU App 💖</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'video-message' + path.extname(videoPath),
          path: videoPath
        }
      ]
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendVideoEmail
};
