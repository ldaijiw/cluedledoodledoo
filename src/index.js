import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { sample, times } from "lodash";

const LEN_WORDS = 5;
const MAX_GUESSES = 6;

// hack to mitigate complications of file systems
const VALID_ANSWERS = require("./data/answers");
const VALID_GUESSES = require("./data/guesses");

class Tile extends React.Component {
  render() {
    return (
      <button
        className="tile"
        style={{
          backgroundColor:
            this.props.color === "green"
              ? "#090"
              : this.props.color === "yellow"
              ? "#FF0"
              : "#FFF",
        }}
      >
        {this.props.char}
      </button>
    );
  }
}

class Row extends React.Component {
  render() {
    let tileColors = Array(LEN_WORDS).fill("");

    if (this.props.showColor) {
      // find counts of each char in answer
      // https://nick3499.medium.com/javascript-populate-hash-table-with-string-character-counts-36459a41afe0
      const char_to_count = {};
      this.props.answer.split("").forEach((char) => {
        char_to_count[char] = (char_to_count[char] || 0) + 1;
      });

      // assign colors to each char in guess
      this.props.guess.split("").forEach((char, index) => {
        if (char in char_to_count && char_to_count[char] > 0) {
          if (this.props.answer[index] === char) {
            tileColors[index] = "green";
          } else {
            tileColors[index] = "yellow";
          }

          // update char count
          char_to_count[char] -= 1;
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: sample(VALID_ANSWERS),
      guesses: Array(MAX_GUESSES).fill(""),
      currentGuessIndex: 0,
    };
  }

  handleKeyboardInput(event) {
    const currentGuessIndex = this.state.currentGuessIndex;
    if (currentGuessIndex < MAX_GUESSES && /[a-zA-Z]/.test(event.key)) {
      const guesses = this.state.guesses.slice();
      if (guesses[currentGuessIndex].length < LEN_WORDS) {
        guesses[currentGuessIndex] += event.key.toLowerCase();
        console.log(guesses);
        this.setState({
          guesses: guesses,
        });
      }
    }
  }

  handleBackspace(event) {
    const currentGuessIndex = this.state.currentGuessIndex;
    if (currentGuessIndex < MAX_GUESSES && event.key === "Backspace") {
      const guesses = this.state.guesses.slice();
      if (guesses[currentGuessIndex].length > 0) {
        guesses[currentGuessIndex] = guesses[currentGuessIndex].slice(0, -1);
        console.log(guesses);
        this.setState({
          guesses: guesses,
        });
      }
    }
  }

  handleSubmitGuess() {
    const guesses = this.state.guesses.slice();
    const currentGuessIndex = this.state.currentGuessIndex;
    if (
      currentGuessIndex < MAX_GUESSES &&
      guesses[currentGuessIndex].length === LEN_WORDS &&
      VALID_GUESSES.has(guesses[currentGuessIndex])
    ) {
      if (guesses[currentGuessIndex] === this.state.answer) {
        // game is won
        // TODO replace alert with something better, that also enables Tile colors to update
        alert("Congrats, you win!");
        // hack to disable further interactions
        this.setState({
          currentGuessIndex: MAX_GUESSES,
        });
      } else {
        if (currentGuessIndex + 1 === MAX_GUESSES) {
          // game is lost
          alert(`Unlucky. The answer is ${this.state.answer}`);
        }
        this.setState({
          currentGuessIndex: currentGuessIndex + 1,
        });
      }
    }
  }

  render() {
    return (
      <>
        <div
          onKeyPress={(event) => {
            this.handleKeyboardInput(event);
          }}
          onKeyDown={(event) => {
            this.handleBackspace(event);
          }}
        >
          {times(MAX_GUESSES, (i) => (
            <Row
              key={i}
              answer={this.state.answer}
              guess={this.state.guesses[i]}
              showColor={i < this.state.currentGuessIndex}
            />
          ))}
        </div>
        <div className="submit-guess-button">
          <button
            className="submit-guess"
            onClick={() => {
              this.handleSubmitGuess();
            }}
          >
            Submit guess
          </button>
        </div>
      </>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
