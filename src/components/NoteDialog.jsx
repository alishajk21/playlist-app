import React from "react";
import "./NoteDialog.css";
const NoteDialog = ({ isOpen, setIsOpen, setShowNote }) => {
  return (
    <div className="envelope-container">
      <div
        className={`envelope ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        {/* Envelope Body */}
        <div className="envelope-body">
          {/* Letter Content - shows when opened */}
          <div className="letter-content">
            <h2>💕 For Someone Very Special</h2>
            <p className="message">
              Hi Raagh, I did something🫣Hope you like it.
            </p>

            <button
              className="gallery-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowNote(false);
              }}
            >
              Open
            </button>
          </div>
        </div>

        {/* Back Flap */}
        <div className="envelope-flap-back"></div>

        {/* Front Flap (the one that opens) */}
        <div className="envelope-flap"></div>

        {/* Seal/Heart */}
        {!isOpen && <div className="envelope-seal">❤️</div>}
      </div>
      <div className="instruction-container">
        {isOpen && <p className="instruction">Read the letter above...</p>}
        {!isOpen && <p className="instruction">Click the envelope to open</p>}
      </div>
    </div>
  );
};

export default NoteDialog;
