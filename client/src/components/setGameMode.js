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

  const getNewMode = () => {
    return props.currentMode === "DAILY" ? "RANDOM" : "DAILY";
  };

  const changeGameMode = () => {
    if (props.currentGuessIndex > 0 && !props.gameOver) {
      setShowChangeInProgressGameModeModal(true);
      console.log("show modal");
      console.log(showChangeInProgressGameModeModal);
    } else {
      props.initializeGame(getNewMode());
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
              props.initializeGame(getNewMode());
            }}
          >
            Abandon ship
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
                changeGameMode();
              }
        }
        style={
          props.currentMode === "DAILY"
            ? {
                background:
                  COLORS_FOR_DAYS_OF_WEEK[props.weekIndexUponStarting],
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
        onClick={
          props.currentMode === "RANDOM"
            ? () => {}
            : () => {
                changeGameMode();
              }
        }
        className={
          props.currentMode === "RANDOM"
            ? "game-mode game-mode-selected game-mode-random"
            : "game-mode game-mode-unselected"
        }
      >
        Random
      </div>
      {renderChangeInProgressGameModeModal()}
    </div>
  );
}

export default SetGameMode;
