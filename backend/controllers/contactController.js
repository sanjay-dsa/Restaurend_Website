const ContactInquiry = require('../models/ContactInquiry');
const nodemailer = require('nodemailer');

// Create contact inquiry
exports.createContactInquiry = async (req, res) => {
  try {
    const { name, email, phoneNumber, subject, message } = req.body;

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phoneNumber,
      subject,
      message
    });

    // Send confirmation email to customer
    await sendConfirmationEmail(email, name);

    // Send notification to admin
    await sendAdminNotification(inquiry);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all inquiries (admin)
exports.getAllInquiries = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) query.status = status;

    const inquiries = await ContactInquiry.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single inquiry (admin)
exports.getInquiry = async (req, res) => {
  try {
    const inquiry = await ContactInquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Respond to inquiry (admin)
exports.respondToInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, respondedBy } = req.body;

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      {
        status: 'Responded',
        response: {
          message,
          respondedAt: new Date(),
          respondedBy
        }
      },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    // Send response email to customer
    await sendResponseEmail(inquiry.email, inquiry.name, message);

    res.status(200).json({
      success: true,
      message: 'Response sent successfully',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const sendConfirmationEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'We received your inquiry',
    html: `
      <h2>Thank You for Contacting Us</h2>
      <p>Dear ${name},</p>
      <p>We have received your inquiry and will get back to you shortly.</p>
      <p>Best regards,<br>The Restaurant Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendResponseEmail = async (email, name, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Response to Your Inquiry',
    html: `
      <h2>Response to Your Inquiry</h2>
      <p>Dear ${name},</p>
      <p>${message}</p>
      <p>Best regards,<br>The Restaurant Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const sendAdminNotification = async (inquiry) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry: ${inquiry.subject}`,
    html: `
      <h2>New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${inquiry.name}</p>
      <p><strong>Email:</strong> ${inquiry.email}</p>
      <p><strong>Phone:</strong> ${inquiry.phoneNumber}</p>
      <p><strong>Subject:</strong> ${inquiry.subject}</p>
      <p><strong>Message:</strong> ${inquiry.message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};