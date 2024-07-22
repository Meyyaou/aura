import React, { useState, useEffect } from "react";
import { getRandomCard, submitChoice } from "../services/api";
import "../styles/GamePage.css";

const Popup = ({ content, position }) => (
  <div className={`popup ${position}`}>{content}</div>
);

function GamePage() {
  const [card, setCard] = useState(null);
  const [isPopped, setPopped] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchRandomCard();
  }, []);

  const fetchRandomCard = async () => {
    try {
      const response = await getRandomCard();
      setCard(response.data);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  const handleHover = (content, position) => {
    setPopupContent(content);
    setPopupPosition(position);
   setPopped(true);
  };

  const handleLeave = () => {
    setPopped(false);
  };
  const handleChoice = async (choice, points) => {
    try {
      await submitChoice(choice);
      setScore(score + points);
      fetchRandomCard();
    } catch (error) {
      console.error('Error submitting choice:', error);
    }
  };

  if (!card) return <div>Loading...</div>;

  return (
    <>
      <div className="score">
        <p>SCORE: <b>{score}</b></p>
      </div>
      <div className="card-container">
        <div 
          className="left-arrow" 
          
        >
          <p onMouseOver={() => handleHover(card.choice1, "left")} 
          onMouseLeave={handleLeave}
          onClick={()=> handleChoice(card.choice1, card.point1)}
          >&lt;</p>
        </div>
        <div className="card">
          <p>{card.content}</p>
        </div>
        <div 
          className="right-arrow" 
         
        >
          <p  onMouseOver={() => handleHover(card.choice2, "right")} 
          onMouseLeave={handleLeave}
          onClick={() => handleChoice(card.choice2, card.point2)}

          >&gt;</p>
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
