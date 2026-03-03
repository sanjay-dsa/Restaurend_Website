import React from 'react';
import Header from '../components/Header';
import ChefBiography from '../components/Chef/ChefBiography';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="home">
      <Header />
      <ChefBiography />
      
      <section className="welcome-section">
        <div className="container">
          <h2>Welcome to Le Bernardin</h2>
          <p>
            Experience fine dining at its finest. Our restaurant combines classical French cuisine 
            with contemporary innovation, featuring the finest seasonal ingredients sourced locally 
            and internationally.
          </p>
        </div>
      </section>
    </div>
  );
}