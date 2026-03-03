import React from 'react';
import ReservationForm from '../components/Reservations/ReservationForm';
import '../styles/reservations.css';

export default function Reservations() {
  return (
    <div className="reservations-page">
      <div className="container">
        <ReservationForm />
      </div>
    </div>
  );
}