import React, { useState } from 'react';
// Import the new Menu icon and a Close icon (X)
import { Brain, MenuIcon, CloseIcon } from './Icons'; // Make sure to add CloseIcon to Icons.tsx

export default function Header(): React.ReactElement {
  // --- ADDED THIS ---
  // State to track if the mobile menu is open or closed
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // --- END ADD ---

  return (
    <header className="app-header">
      {/* Left Side: Logo and Title */}
      <div className="header-logo">
        <Brain className="icon" />
        <div>
          <h1>Student Performance Predictor</h1>
          <p>Using an ANN to identify at-risk students.</p>
        </div>
      </div>

      {/* Right Side: Navigation */}
      <nav className="header-nav">
        {/* Desktop Navigation Links */}
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#feedback">Feedback</a></li>
        </ul>
      </nav>

      {/* Mobile Menu Button (Only shows on small screens) */}
      <button 
        className="menu-button"
        // --- ADDED THIS ---
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        // --- END ADD ---
        aria-label="Open navigation menu"
      >
        {/* --- ADDED LOGIC --- */}
        {/* Show a 'Close' (X) icon if the menu is open */}
        {isMobileMenuOpen ? (
          <CloseIcon className="icon" />
        ) : (
          <MenuIcon className="icon" />
        )}
        {/* --- END ADD --- */}
      </button>

      {/* --- ADDED THIS ENTIRE BLOCK --- */}
      {/* Mobile Menu Dropdown */}
      {/* This menu is rendered conditionally */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <nav>
            <ul>
              <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a></li>
              <li><a href="#feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedback</a></li>
            </ul>
          </nav>
        </div>
      )}
      {/* --- END ADD --- */}
    </header>
  );
}