import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { COLORS_FOR_DAYS_OF_WEEK } from "../data/constants";
import "../index.css";

function SetGameMode(props) {
  const [
    showChangeInProgressGameModeModal,
    setShowChangeInProgressGameModeModal,
  ] = useState(false);
  const [showNewGameModeModal, setShowNewGameModeModal] = useState(false);
  const [nextGameMode, setNextGameMode] = useState(props.currentMode);

  const startNewGame = (newGameMode) => {
    // TODO only use one of nextGameMode, newGameMode
    // calling setNextGameMode() with new mode before all calls of startNewGame() requires double clicking the game mode buttons, probably due re-rendering issues
    setNextGameMode(newGameMode);
    if (props.currentGuessIndex > 0) {
      if (!props.gameOver) {
        setShowChangeInProgressGameModeModal(true);
      } else {
        setShowNewGameModeModal(true);
      }
    } else {
      props.initializeGame(newGameMode);
    }
  };

  const renderChangeInProgressGameModeModal = () => {
    return (
      <Modal
        show={showChangeInProgressGameModeModal}
        onHide={() => {
          setShowChangeInProgressGameModeModal(false);
        }}
        // TODO implement class, add className
      >
        <Modal.Header closeButton>
          <Modal.Title>Wait!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change game modes? Your current game will be
          lost.
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-success"
            onClick={() => {
              setShowChangeInProgressGameModeModal(false);
            }}
          >
            Keep playing
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setShowChangeInProgressGameModeModal(false);
              props.initializeGame(nextGameMode);
            }}
          >
            Abandon ship
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderNewGameModeModal = () => {
    return (
      <Modal
        show={showNewGameModeModal}
        onHide={() => {
          setShowNewGameModeModal(false);
        }}
        // TODO implement class, add className
      >
        <Modal.Header closeButton>
          <Modal.Title>New game</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to play another game?</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-success"
            onClick={() => {
              setShowNewGameModeModal(false);
              props.initializeGame(nextGameMode);
            }}
          >
            New game
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setShowNewGameModeModal(false);
            }}
          >
            Stay here
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "40px",
      }}
    >
      <div
        onClick={
          props.currentMode === "DAILY"
            ? () => {}
            : () => {
                startNewGame("DAILY");
              }
        }
        style={
          props.currentMode === "DAILY"
            ? {
                background:
                  COLORS_FOR_DAYS_OF_WEEK[props.weekDayIndexUponStarting],
              }
            : {}
        }
        className={
          props.currentMode === "DAILY"
            ? "game-mode game-mode-selected"
            : "game-mode game-mode-unselected"
        }
      >
        Daily
      </div>
      <div
        onClick={() => {
          startNewGame("RANDOM");
        }}
        className={
          props.currentMode === "RANDOM"
            ? "game-mode game-mode-selected game-mode-random"
            : "game-mode game-mode-unselected"
        }
      >
        Random
      </div>
      {renderChangeInProgressGameModeModal()}
      {renderNewGameModeModal()}
    </div>
  );
}

export default SetGameMode;
