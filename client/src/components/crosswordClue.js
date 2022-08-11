import "bootstrap/dist/css/bootstrap.min.css";
import { sample } from "lodash";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MAX_GUESSES } from "../data/constants";
import { ANSWER_TO_CROSSWORD_CLUES } from "../data/crosswordClues";
import "../index.css";

function CrosswordClue(props) {
  const [showGetCrosswordClueModal, setShowGetCrosswordClueModal] =
    useState(false);
  const [showCrosswordClueResultModal, setShowCrosswordClueResultModal] =
    useState(false);
  const [crosswordClueResult, setCrosswordClueResult] = useState("");
  // TODO implement used clue detection
  // const [usedCrosswordClue, setUsedCrosswordClue] = useState(false);

  const doCrosswordClue = () => {
    props.useCrosswordClue();
    setCrosswordClueResult(sample(ANSWER_TO_CROSSWORD_CLUES[props.answer]));
    // TODO figure out why this prevents clue result modal from showing. probably something to do with renders
    // setUsedCrosswordClue(true);
    setShowCrosswordClueResultModal(true);
  };

  const renderGetCrosswordClueModal = () => {
    return (
      <Modal
        show={showGetCrosswordClueModal}
        onHide={() => {
          setShowGetCrosswordClueModal(false);
        }}
        // TODO implement class, add className
      >
        <Modal.Header closeButton>
          <Modal.Title>Clue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Here's the trade. 2 guesses for a crossword clue of the answer.
          <br />
          Are you in?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setShowGetCrosswordClueModal(false);
            }}
          >
            No *gulp*
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => {
              setShowGetCrosswordClueModal(false);
              doCrosswordClue();
            }}
          >
            I'm in
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderCrosswordClueResultModal = () => {
    return (
      <Modal
        show={showCrosswordClueResultModal}
        onHide={() => {
          setShowCrosswordClueResultModal(false);
        }}
        // TODO implement class, add className
      >
        <Modal.Header closeButton>
          <Modal.Title>Clue result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Crossword clue for answer: {crosswordClueResult}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            onClick={() => {
              setShowCrosswordClueResultModal(false);
            }}
          >
            Got it
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      {/* TODO prevent duplicate clue usage */}
      {/* {props.currentGuessIndex + 2 < MAX_GUESSES && !usedCrosswordClue ? ( */}
      {props.currentGuessIndex + 2 < MAX_GUESSES ? (
        <>
          <div
            className="clue clue-enabled"
            onClick={() => {
              setShowGetCrosswordClueModal(true);
            }}
          >
            Crossword clue
          </div>
        </>
      ) : (
        <div className="clue clue-disabled">Crossword clue</div>
      )}
      {renderGetCrosswordClueModal()}
      {renderCrosswordClueResultModal()}
    </>
  );
}

export default CrosswordClue;
