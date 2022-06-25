import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { times } from 'lodash'

const LEN_WORDS = 5;
const NUM_ROWS = 6;

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: props.char,
    };
  }

  render() {
    return (
      <button className="tile">
        {this.state.char}
      </button>
    )
  }
}

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: props.guess,
    };
  } 

  
  render() {
    return (
      <div className="row">
        {times(LEN_WORDS, i => 
          <Tile key={i} char={this.state.guess?.[i]}/>
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
      // guesses: Array(NUM_ROWS).fill(null),
      guesses: ["abcde", "fghij", "klmno", "pqrst", "uvwxy", "zabcd"]
    };
  }

  render() {
    return (
      <>
        <div>
          {times(NUM_ROWS, i =>
            <Row key={i} guess={this.state.guesses[i]}/>
          )}
        </div>
        <div className="submit-guess-button">
          <button className="submit-guess">
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
  