const mongoose = require('mongoose');

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide phone number']
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      enum: ['General Inquiry', 'Event Booking', 'Feedback', 'Catering Request', 'Other']
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
      type: String,
      enum: ['New', 'Read', 'Responded'],
      default: 'New'
    },
    response: {
      message: String,
      respondedAt: Date,
      respondedBy: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactInquiry', contactInquirySchema);