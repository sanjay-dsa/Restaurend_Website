import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>Le Bernardin</h4>
            <p>Excellence in Culinary Arts</p>
          </div>
          <div className="footer-section">
            <h4>Hours</h4>
            <p>Lunch: 12:00 PM - 3:00 PM</p>
            <p>Dinner: 6:00 PM - 11:00 PM</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>(555) 123-4567</p>
            <p>info@lebernard.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Le Bernardin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}