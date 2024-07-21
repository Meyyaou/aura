import React from "react";
import "../styles/GamePage.css";

function GamePage() {
  return (
    <>
      <div className="score">
        <p>SCORE: <b>22</b></p>
      </div>
      <div className="card-container">
        <div className="left-arrow">&lt;</div>
        <div className="card"><p>ALLER AU STADE ET 
        CHANTER AVEC LES SUPPORTERS</p></div>
        <div className="right-arrow">&gt;</div>
      </div>
      <div className="game-phrase">
        <p>FAIS TON CHOIX ET DECOUVRE LA VRAIE VALEUR DE TON AURA</p>
      </div>
      <div className="line-game"></div>
    </>
  );
}

export default GamePage;
