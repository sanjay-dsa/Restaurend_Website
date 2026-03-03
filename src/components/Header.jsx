import React from 'react';
import '../styles/header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="restaurant-title">Le Bernardin</h1>
          <p className="tagline">Excellence in Culinary Arts</p>
        </div>
        <div className="header-image">
          <img 
            src="https://images.unsplash.com/photo-1504674900152-b8b0ce3b0db3?w=1200&h=600&fit=crop" 
            alt="Fine Dining"
            className="hero-image"
          />
        </div>
      </div>
    </header>
  );
}