import React, { useState, useEffect } from "react";
import { getRandomCard, submitChoice } from "../services/api";
import "../styles/GamePage.css";

const Popup = ({ content, position }) => (
  <div className={`popup ${position}`}>{content}</div>
);

const ScoreDisplay = ({ score }) => (
  <div className="score-display">
    <h2>ton score est: {score}</h2>
    {score > 50 && <h2>bravo, tu es doté d'une aura rocambolesque</h2>}
    {score < 50 && <h2>quel dommage, tu es une merde</h2>}
    <h3>
      actualise la page pour rejouer et te prouver que tu es encore meilleur que
      ça
    </h3>
  </div>
);

function GamePage() {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isPopped, setPopped] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupPosition, setPopupPosition] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetchRandomCard();
  }, []);

  const fetchRandomCard = async () => {
    try {
      const response = await getRandomCard();
      const newCard = response.data;

      // avoid adding duplicate cards
      if (!cards.some((card) => card._id === newCard._id)) {
        setCards((prevCards) => {
          const updatedCards = [...prevCards, newCard];
          console.log("Updated cards:", updatedCards);
          return updatedCards;
        });

        if (cards.length + 1 >= 20) {
          await resetUsedFields();
          setShowScore(true);
        } else {
          setCurrentCardIndex(cards.length); // set index to the next card
        }
      } else {
        // fetch another card si duplicate is foundd
        fetchRandomCard();
      }
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  };
  const resetUsedFields = async () => {
    try {
      console.log("Sending request to reset used fields...");
      const response = await fetch(
        "http://localhost:4000/api/choice/resetUsedFields",
        { method: "POST" }
      );
      if (response.ok) {
        console.log("Successfully reset used fields.");
      } else {
        console.error("Failed to reset used fields. Status:", response.status);
      }
    } catch (error) {
      console.error("Error resetting used fields:", error);
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
      console.error("Error submitting choice:", error);
    }
  };

  const currentCard = cards[currentCardIndex] || null;

  if (showScore) {
    return <ScoreDisplay score={score} />;
  }

  if (!currentCard) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/*<div className="score">
        <p>SCORE: <b>{score}</b></p>
      </div>
*/}
      <div className="card-container">
        <div className="left-arrow">
          <p
            onMouseOver={() => handleHover(currentCard.choice1, "left")}
            onMouseLeave={handleLeave}
            onClick={() =>
              handleChoice(currentCard.choice1, currentCard.point1)
            }
          >
            &lt;
          </p>
        </div>
        <div className="card">
          <p>{currentCard.content}</p>
        </div>
        <div className="right-arrow">
          <p
            onMouseOver={() => handleHover(currentCard.choice2, "right")}
            onMouseLeave={handleLeave}
            onClick={() =>
              handleChoice(currentCard.choice2, currentCard.point2)
            }
          >
            &gt;
          </p>
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
