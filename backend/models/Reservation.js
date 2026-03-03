const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
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
    reservationDate: {
      type: Date,
      required: [true, 'Please provide reservation date']
    },
    reservationTime: {
      type: String,
      required: [true, 'Please provide reservation time'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide valid time in HH:MM format']
    },
    numberOfGuests: {
      type: Number,
      required: [true, 'Please provide number of guests'],
      min: [1, 'At least 1 guest required'],
      max: [12, 'Maximum 12 guests allowed per reservation']
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot exceed 500 characters']
    },
    dietaryRestrictions: [
      {
        type: String
      }
    ],
    occasion: {
      type: String,
      enum: ['Birthday', 'Anniversary', 'Business', 'Celebration', 'Other'],
      default: 'Other'
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
    confirmationCode: {
      type: String,
      unique: true,
      sparse: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

reservationSchema.pre('save', async function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);