import "bootstrap/dist/css/bootstrap.min.css";
import { sample, times } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { LEN_WORDS, MAX_GUESSES } from "../data/constants";
import { VALID_ANSWERS } from "../data/validAnswers";
import { VALID_GUESSES } from "../data/validGuesses";
import "../index.css";
import CrosswordClue from "./crosswordClue";
import Row from "./row.js";
import SetGameMode from "./setGameMode";

function Game() {
  const [guessedAnswer, setGuessedAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [answer, setAnswer] = useState("");
  const [answerCharCounts, setAnswerCharCounts] = useState({});

  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(""));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  const [currentMode, setCurrentMode] = useState("DAILY"); // can be "DAILY", "RANDOM"
  const [weekDayIndexUponStarting, setWeekDayIndexUponStarting] = useState(
    new Date().getDay()
  );

  const [showResultsModal, setShowResultsModal] = useState(false);

  const gameInputRef = useRef(null);

  // define initialize game
  const initializeGame = (gameMode) => {
    setCurrentMode(gameMode);
    let gameAnswer;
    if (gameMode === "DAILY") {
      const dayNumber = Math.floor(new Date() / 8.64e7); // 8.64e7 is number of ms in a day
      gameAnswer = VALID_ANSWERS[dayNumber % VALID_ANSWERS.length];
    } else if (gameMode === "RANDOM") {
      gameAnswer = sample(VALID_ANSWERS);
    }
    setAnswer(gameAnswer);

    // compute count of each char in answer
    // https://nick3499.medium.com/javascript-populate-hash-table-with-string-character-counts-36459a41afe0
    const charToCount = {};
    gameAnswer.split("").forEach((char) => {
      charToCount[char] = (charToCount[char] || 0) + 1;
    });
    setAnswerCharCounts(charToCount);

    setGuessedAnswer(false);
    setGameOver(false);
    setGuesses(Array(MAX_GUESSES).fill(""));
    setCurrentGuessIndex(0);
    setWeekDayIndexUponStarting(new Date().getDay());

    gameInputRef.current.focus();
  };

  // invoke initialize game once at beginning
  useEffect(() => {
    initializeGame(currentMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyboardInput = (event) => {
    if (!gameOver) {
      if (/[a-zA-Z]/.test(event.key) && event.key.length === 1) {
        if (guesses[currentGuessIndex].length < LEN_WORDS) {
          const guessesCopy = guesses.slice();
          guessesCopy[currentGuessIndex] += event.key.toLowerCase();
          setGuesses(guessesCopy);
        }
      } else if (event.key === "Enter") {
        handleSubmitGuess();
      }
    }
  };

  const handleBackspace = (event) => {
    if (!gameOver && event.key === "Backspace") {
      if (guesses[currentGuessIndex].length > 0) {
        const guessesCopy = guesses.slice();
        guessesCopy[currentGuessIndex] = guesses[currentGuessIndex].slice(
          0,
          -1
        );
        setGuesses(guessesCopy);
      }
    }
  };

  const handleSubmitGuess = () => {
    if (
      !gameOver &&
      guesses[currentGuessIndex].length === LEN_WORDS &&
      VALID_GUESSES.has(guesses[currentGuessIndex])
    ) {
      if (guesses[currentGuessIndex] === answer) {
        setGuessedAnswer(true);
        setGameOver(true);
        setShowResultsModal(true);
      } else if (currentGuessIndex + 1 === MAX_GUESSES) {
        setGameOver(true);
        setShowResultsModal(true);
      }
      setCurrentGuessIndex(currentGuessIndex + 1);
    }
  };

  const useCrosswordClue = () => {
    const guessesCopy = guesses.slice();
    guessesCopy[currentGuessIndex] = "-".repeat(LEN_WORDS);
    guessesCopy[currentGuessIndex + 1] = "-".repeat(LEN_WORDS);
    setGuesses(guessesCopy);
    setCurrentGuessIndex(currentGuessIndex + 2);
    gameInputRef.current.focus();
  };

  const renderResultsModal = () => {
    const gameWonDescriptors = [
      "Holy shit",
      "Incredible",
      "Wow",
      "Congrats",
      "Nice",
      "Phew",
    ];
    if (guessedAnswer) {
      // game won
      return (
        <Modal
          show={showResultsModal}
          onHide={() => {
            setShowResultsModal(false);
          }}
          className="game-won-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>You got it!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {gameWonDescriptors[currentGuessIndex - 1]}! You found {answer} in{" "}
            {currentGuessIndex} guess
            {currentGuessIndex === 1 ? "" : "es"}!
          </Modal.Body>
        </Modal>
      );
    } else if (gameOver) {
      // game lost
      return (
        <Modal
          show={showResultsModal}
          onHide={() => {
            setShowResultsModal(false);
          }}
          className="game-lost-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Unlucky!</Modal.Title>
          </Modal.Header>
          <Modal.Body>The answer is {answer}.</Modal.Body>
        </Modal>
      );
    }
    return null;
  };

  return (
    <div className="game">
      <div className="title-and-mode">
        <div className="title">Cluedledoodledoo</div>
        <SetGameMode
          initializeGame={initializeGame}
          currentMode={currentMode}
          currentGuessIndex={currentGuessIndex}
          gameOver={gameOver}
          weekDayIndexUponStarting={weekDayIndexUponStarting}
        />
      </div>
      <div
        onKeyPress={(event) => {
          handleKeyboardInput(event);
        }}
        onKeyDown={(event) => {
          handleBackspace(event);
        }}
        ref={gameInputRef}
        tabIndex={0}
      >
        {times(MAX_GUESSES, (i) => (
          <Row
            key={i}
            answer={answer}
            answerCharCounts={answerCharCounts}
            guess={guesses[i]}
            showColor={i < currentGuessIndex}
          />
        ))}
      </div>
      {/* <SynonymClue
        answer={answer}
        currentGuessIndex={currentGuessIndex}
        useSynonymClue={useSynonymClue}
      /> */}
      <CrosswordClue
        answer={answer}
        currentGuessIndex={currentGuessIndex}
        useCrosswordClue={useCrosswordClue}
      />
      {renderResultsModal()}
    </div>
  );
}

export default Game;
