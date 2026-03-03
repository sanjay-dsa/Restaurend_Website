import React from 'react';
import '../../styles/chef.css';

export default function ChefBiography() {
  return (
    <section className="chef-biography">
      <div className="container">
        <div className="chef-content">
          <div className="chef-image">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop" 
              alt="Chef Portrait"
            />
          </div>

          <div className="chef-info">
            <h2>Chef Laurent Delacroix</h2>
            <p className="chef-title">Culinary Director & Head Chef</p>

            <p className="chef-bio">
              With over 25 years of experience in fine dining establishments across Europe and America, 
              Chef Laurent brings a unique perspective to contemporary French cuisine. His innovative approach 
              combines classical techniques with seasonal ingredients sourced from our trusted partners.
            </p>

            <p className="chef-bio">
              Chef Laurent's philosophy centers on simplicity, elegance, and the pursuit of perfection in every dish. 
              He believes that exceptional food comes from exceptional ingredients and impeccable technique, 
              paired with a deep respect for culinary traditions.
            </p>

            <div className="chef-accolades">
              <h3>Notable Achievements</h3>
              <ul>
                <li>Michelin Three-Star Recognition (2015-2023)</li>
                <li>James Beard Foundation Award Nominee</li>
                <li>Best New Restaurant - Culinary Monthly (2015)</li>
                <li>Chef of the Year - Fine Dining Association (2020)</li>
              </ul>
            </div>

            <div className="chef-specialties">
              <h3>Chef's Specialties</h3>
              <div className="specialties-grid">
                <div className="specialty">
                  <span className="icon">🦞</span>
                  <p>Seafood Mastery</p>
                </div>
                <div className="specialty">
                  <span className="icon">🍷</span>
                  <p>Wine Pairings</p>
                </div>
                <div className="specialty">
                  <span className="icon">🌿</span>
                  <p>Farm to Table</p>
                </div>
                <div className="specialty">
                  <span className="icon">✨</span>
                  <p>Molecular Gastronomy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}