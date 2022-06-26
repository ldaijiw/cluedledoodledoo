import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { times } from 'lodash'

const LEN_WORDS = 5;
const MAX_GUESSES = 6;

class Tile extends React.Component {
  render() {
    return (
      <button className="tile">
        {this.props.char}
      </button>
    )
  }
}

class Row extends React.Component {
  render() {
    return (
      <div className="row">
        {times(LEN_WORDS, i => 
          <Tile key={i} char={this.props.guess?.[i]}/>
        )}
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // TODO randomize initialization of answer
      answer: 'salad',
      // TODO remove test array
      guesses: Array(MAX_GUESSES).fill(''),
      // guesses: ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "zabcd"],
      currentGuessIndex: 0,
    };
  }

  handleKeyboardInput(event) {
    const currentGuessIndex = this.state.currentGuessIndex;
    if (currentGuessIndex < MAX_GUESSES && (/[a-zA-Z]/).test(event.key)) {
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
    if (currentGuessIndex < MAX_GUESSES && event.key === 'Backspace') {
      const guesses = this.state.guesses.slice();
      if (guesses[currentGuessIndex].length > 0) {
        guesses[currentGuessIndex] = guesses[currentGuessIndex].slice(0, -1);
        console.log(guesses);
        this.setState({
          guesses: guesses
        })
      }
    }
  }

  handleSubmitGuess() {
    const currentGuessIndex = this.state.currentGuessIndex;
    const currentGuess = this.state.guesses[this.state.currentGuessIndex].slice();
    if (currentGuess.length === LEN_WORDS) {
      this.setState({
        currentGuessIndex: currentGuessIndex + 1
      })
    }
  }

  render() {
    return (
      <>
        <div onKeyPress={(event) => {this.handleKeyboardInput(event)}} onKeyDown={(event) => {this.handleBackspace(event)}}>
          {times(MAX_GUESSES, i =>
            <Row key={i} guess={this.state.guesses[i]}/>
          )}
        </div>
        <div className="submit-guess-button">
          <button className="submit-guess" onClick={() => {this.handleSubmitGuess()}}>
            Submit guess
          </button>
        </div>
      </>
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
  