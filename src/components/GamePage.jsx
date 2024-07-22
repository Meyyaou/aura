import React, { useState } from "react";
import "../styles/GamePage.css";

const Popup = ({ content, position }) => (
  <div className={`popup ${position}`}>{content}</div>
);

function GamePage() {
  const [isPopped, setPopped] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState("");

  const handleHover = (content, position) => {
    setPopupContent(content);
    setPopupPosition(position);
   setPopped(true);
  };

  const handleLeave = () => {
    setPopped(false);
  };

  return (
    <>
      <div className="score">
        <p>SCORE: <b>22</b></p>
      </div>
      <div className="card-container">
        <div 
          className="left-arrow" 
          
        >
          <p onMouseOver={() => handleHover("Left Arrow Popup", "left")} 
          onMouseLeave={handleLeave}>&lt;</p>
        </div>
        <div className="card">
          <p>ALLER AU STADE ET CHANTER AVEC LES SUPPORTERS</p>
        </div>
        <div 
          className="right-arrow" 
         
        >
          <p  onMouseOver={() => handleHover("Right Arrow Popup", "right")} 
          onMouseLeave={handleLeave}>&gt;</p>
        </div>
      </div>
      <div className="game-phrase">
        <p>FAIS TON CHOIX ET DECOUVRE LA VRAIE VALEUR DE TON AURA</p>
      </div>
      <div className="line-game"></div>
      {isPopped && <Popup content={popupContent} position={popupPosition} />}
    </>
  );
}

export default GamePage;
