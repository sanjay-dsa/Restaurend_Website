import React, { useState } from 'react';
import '../../styles/reservations.css';
import { API_BASE_URL } from '../../utils/constants';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    reservationDate: '',
    reservationTime: '',
    numberOfGuests: '2',
    occasion: 'Other',
    specialRequests: '',
    dietaryRestrictions: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        dietaryRestrictions: checked
          ? [...prev.dietaryRestrictions, value]
          : prev.dietaryRestrictions.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setConfirmationCode(data.confirmationCode);
        setSubmitted(true);
      } else {
        setError(data.message || 'Failed to create reservation');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="reservation-success">
        <h3>Reservation Confirmed!</h3>
        <p>Thank you for your reservation at Le Bernardin.</p>
        <div className="confirmation-code">
          <strong>Confirmation Code:</strong>
          <p className="code">{confirmationCode}</p>
        </div>
        <p>A confirmation email has been sent to {formData.email}</p>
        <button className="btn-primary" onClick={() => {
          setSubmitted(false);
          setFormData({
            customerName: '',
            email: '',
            phoneNumber: '',
            reservationDate: '',
            reservationTime: '',
            numberOfGuests: '2',
            occasion: 'Other',
            specialRequests: '',
            dietaryRestrictions: []
          });
        }}>
          Make Another Reservation
        </button>
      </div>
    );
  }

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Make a Reservation</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Guests *</label>
          <select
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleInputChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Reservation Date *</label>
          <input
            type="date"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="form-group">
          <label>Reservation Time *</label>
          <input
            type="time"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Occasion</label>
        <select name="occasion" value={formData.occasion} onChange={handleInputChange}>
          <option>Other</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Business</option>
          <option>Celebration</option>
        </select>
      </div>

      <div className="form-group">
        <label>Dietary Restrictions</label>
        <div className="checkboxes">
          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Nut Allergy', 'Shellfish Allergy'].map(restriction => (
            <label key={restriction}>
              <input
                type="checkbox"
                value={restriction}
                checked={formData.dietaryRestrictions.includes(restriction)}
                onChange={handleInputChange}
              />
              {restriction}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          placeholder="Any special requests or preferences?"
          maxLength={500}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}>
        {loading ? 'Booking...' : 'Confirm Reservation'}
      </button>
    </form>
  );
}