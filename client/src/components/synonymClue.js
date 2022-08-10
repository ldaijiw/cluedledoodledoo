// TODO this component is practically useless since the synonym API is trash (https://api.dictionaryapi.dev/api/v2/entries/en/${props.answer}`)
// the quality of synonyms probably honestly provides more confusion than guidance
// find a better API and this can be used again
// can also use this API for other clue paradigms, such as dictionary definition

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MAX_GUESSES } from "../data/constants";
import "../index.css";

const NO_SYNONYM_MSG =
  "Either the answer has no synonyms, or all synonyms contain the answer. No penalty.";

function SynonymClue(props) {
  const [showGetClueModal, setShowGetClueModal] = useState(false);
  const [showClueResultModal, setShowClueResultModal] = useState(false);
  const [clueResult, setClueResult] = useState(NO_SYNONYM_MSG); // set to failure state as fallback. is overwritten in case of success
  // TODO implement used clue detection
  // const [usedSynonymClue, setUsedSynonymClue] = useState(false);

  const doSynonymClue = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.answer}`)
      .then((results) => {
        for (const wordSense of results.data) {
          for (const entry of wordSense.meanings) {
            if (entry.partOfSpeech === "noun") {
              for (const synonym of entry.synonyms) {
                if (!synonym.toLowerCase().includes(props.answer)) {
                  // synonym and doesn't contain the answer as a substring
                  props.useSynonymClue();
                  setClueResult(synonym.toLowerCase());
                  break;
                }
              }
            }
          }
        }
        // TODO figure out why this prevents clue result modal from showing. probably something to do with renders
        // setUsedSynonymClue(true);
        setShowClueResultModal(true);
      })
      .catch((error) => {
        console.log(error);
        setShowClueResultModal(true);
      });
  };

  const renderGetClueModal = () => {
    return (
      <Modal
        show={showGetClueModal}
        onHide={() => {
          setShowGetClueModal(false);
        }}
        // TODO implement class, add className
      >
        <Modal.Header closeButton>
          <Modal.Title>Clue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Here's the trade. 2 guesses for a synonym of the answer.
          <br />
          Are you in?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-danger"
            onClick={() => {
              setShowGetClueModal(false);
            }}
          >
            No *gulp*
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => {
              setShowGetClueModal(false);
              doSynonymClue();
            }}
          >
            I'm in
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const renderClueResultModal = () => {
    return (
      <Modal
        show={showClueResultModal}
        onHide={() => {
          setShowClueResultModal(false);
        }}
        // TODO implement class, add className
      >
        <Modal.Header closeButton>
          <Modal.Title>Clue result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clueResult !== NO_SYNONYM_MSG ? (
            <div>Synonym to answer: {clueResult}</div>
          ) : (
            <div>{NO_SYNONYM_MSG}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            onClick={() => {
              setShowClueResultModal(false);
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
      {/* {props.currentGuessIndex + 2 < MAX_GUESSES && !usedSynonymClue ? ( */}
      {props.currentGuessIndex + 2 < MAX_GUESSES ? (
        <>
          <div
            className="clue clue-enabled"
            onClick={() => {
              setShowGetClueModal(true);
            }}
          >
            Synonym clue
          </div>
          {renderGetClueModal()}
          {renderClueResultModal()}
        </>
      ) : (
        <div className="clue clue-disabled">Synonym clue</div>
      )}
    </>
  );
}

export default SynonymClue;
