'use client'
import { Box, Link } from "@mui/material";
import './LandingPage.css';

export default function Home() {

  return (
    <>


    <div className="landing-container">
      <header className="landing-header">
        <h1 className="landing-title">Welcome to First Aid</h1>
        <p className="landing-subtitle">Your guide to providing emergency medical care</p>
        <button className="landing-button"><a href="/home">Find out more</a></button>
      </header>
      <section className="landing-content">
        <div className="landing-feature">
          <h2>Quick Help</h2>
          <p>Access quick and easy first aid instructions.</p>
        </div>
        <div className="landing-feature">
          <h2>Step by Step Instructions</h2>
          <p>Detailed guides that walk you through every step in an emergency.</p>
        </div>
        <div className="landing-feature">
          <h2>Interactive Tools</h2>
          <p>Use interactive tools for better preparation and understanding.</p>
        </div>
      </section>
    </div>
    </>
  
    
  );
}

