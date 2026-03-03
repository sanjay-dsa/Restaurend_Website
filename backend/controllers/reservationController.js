const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');

// Create reservation
exports.createReservation = async (req, res, next) => {
  try {
    const { customerName, email, phoneNumber, reservationDate, reservationTime, numberOfGuests, specialRequests, dietaryRestrictions, occasion } = req.body;

    // Validate reservation date is in future
    const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);
    if (reservationDateTime < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Reservation date must be in the future'
      });
    }

    const reservation = await Reservation.create({
      customerName,
      email,
      phoneNumber,
      reservationDate,
      reservationTime,
      numberOfGuests,
      specialRequests,
      dietaryRestrictions,
      occasion
    });

    // Send confirmation email
    await sendConfirmationEmail(email, reservation);

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      confirmationCode: reservation.confirmationCode,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all reservations (admin)
exports.getAllReservations = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};

    if (status) query.status = status;
    if (startDate || endDate) {
      query.reservationDate = {};
      if (startDate) query.reservationDate.$gte = new Date(startDate);
      if (endDate) query.reservationDate.$lte = new Date(endDate);
    }

    const reservations = await Reservation.find(query).sort({ reservationDate: 1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get reservation by confirmation code
exports.getReservationByCode = async (req, res, next) => {
  try {
    const { confirmationCode } = req.params;
    const reservation = await Reservation.findOne({ confirmationCode });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update reservation status (admin)
exports.updateReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel reservation
exports.cancelReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: 'Cancelled' },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully',
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send confirmation email
const sendConfirmationEmail = async (email, reservation) => {
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
    subject: `Reservation Confirmed - Confirmation Code: ${reservation.confirmationCode}`,
    html: `
      <h2>Reservation Confirmed</h2>
      <p>Dear ${reservation.customerName},</p>
      <p>Your reservation has been confirmed.</p>
      <h3>Reservation Details:</h3>
      <ul>
        <li><strong>Date:</strong> ${reservation.reservationDate.toDateString()}</li>
        <li><strong>Time:</strong> ${reservation.reservationTime}</li>
        <li><strong>Number of Guests:</strong> ${reservation.numberOfGuests}</li>
        <li><strong>Confirmation Code:</strong> ${reservation.confirmationCode}</li>
      </ul>
      <p>Please keep your confirmation code for reference.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};