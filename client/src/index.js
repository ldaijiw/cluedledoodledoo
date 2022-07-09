import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { sample, times } from "lodash";
import axios from "axios";

const LEN_WORDS = 5;
const MAX_GUESSES = 6;
const COLORS = {
  WHITE: "#FFF",
  YELLOW: "#FF0",
  GREEN: "#090",
};

class Tile extends React.Component {
  render() {
    return (
      <button
        className="tile"
        style={{
          backgroundColor: this.props.color,
          transition: this.props.showColor ? "background-color 1s" : "none",
        }}
      >
        {this.props.char}
      </button>
    );
  }
}

class Row extends React.Component {
  render() {
    let tileColors = Array(LEN_WORDS).fill(COLORS.WHITE);

    if (this.props.showColor) {
      let answerCharCounts = { ...this.props.answerCharCounts };

      // assign colors to each char in guess
      this.props.guess.split("").forEach((char, index) => {
        if (char in answerCharCounts && answerCharCounts[char] > 0) {
          if (this.props.answer[index] === char) {
            tileColors[index] = COLORS.GREEN;
          } else {
            tileColors[index] = COLORS.YELLOW;
          }

          // update char count
          answerCharCounts[char] -= 1;
        }
      });
    }

    return (
      <div className="row">
        {times(LEN_WORDS, (i) => (
          <Tile
            key={i}
            char={this.props.guess?.[i]}
            showColor={this.props.showColor}
            color={tileColors[i]}
          />
        ))}
      </div>
    );
  }
}

function Game() {
  const [validGuesses, setValidGuesses] = useState(undefined);
  const [answer, setAnswer] = useState("");
  const [answerCharCounts, setAnswerCharCounts] = useState({});
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(""));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);

  useEffect(() => {
    axios.get("/validAnswers").then((res) => {
      const game_answer = sample(res.data.validAnswers);
      setAnswer(game_answer);

      // compute count of each char in answer
      // https://nick3499.medium.com/javascript-populate-hash-table-with-string-character-counts-36459a41afe0
      const char_to_count = {};
      game_answer.split("").forEach((char) => {
        char_to_count[char] = (char_to_count[char] || 0) + 1;
      });
      setAnswerCharCounts(char_to_count);
    });

    axios.get("/validGuesses").then((res) => {
      const setAnswers = new Set(res.data.validGuesses);
      setValidGuesses(setAnswers);
    });

    // eslint-disable-next-line
  }, []);

  const handleKeyboardInput = (event) => {
    if (currentGuessIndex < MAX_GUESSES) {
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
    if (currentGuessIndex < MAX_GUESSES && event.key === "Backspace") {
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
      currentGuessIndex < MAX_GUESSES &&
      guesses[currentGuessIndex].length === LEN_WORDS &&
      validGuesses.has(guesses[currentGuessIndex])
    ) {
      if (guesses[currentGuessIndex] === answer) {
        // game is won
        // TODO replace alert with something better, that also enables Tile colors to update
        alert("Congrats, you win!");
        // hack to disable further interactions
        setCurrentGuessIndex(MAX_GUESSES);
      } else {
        if (currentGuessIndex + 1 === MAX_GUESSES) {
          // game is lost
          alert(`Unlucky. The answer is ${answer}`);
        }
        setCurrentGuessIndex(currentGuessIndex + 1);
      }
    }
  };

  return (
    <>
      <div className="title">Cluedledoodledoo</div>
      <div
        onKeyPress={(event) => {
          handleKeyboardInput(event);
        }}
        onKeyDown={(event) => {
          handleBackspace(event);
        }}
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
    </>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
