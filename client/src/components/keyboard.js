import "bootstrap/dist/css/bootstrap.min.css";
import { times } from "lodash";
import React from "react";
import { COLORS, LEN_WORDS } from "../data/constants";
import "../index.css";
import Tile from "./tile.js";

class Keyboard extends React.Component {
  render() {
    return (
      <div className="keyboard">
        {times(this.props.letters.length, (i) => (
          <Tile
            key={i}
            char={this.props.letters[i]}
            // showColor={this.props.showColor}
            showColor={true}
            color={"blinker-green"}
            // color={tileColors[i]}
            // animationName={
            //   tileColors.includes(COLORS.GREEN)
            //     ? "blinker-green"
            //     : tileColors.includes(COLORS.YELLOW)
            //     ? "blinker-yellow"
            //     : "blinker-red"
            // }
          />
        ))}
      </div>
    );
  }
  // render() {
  //   let tileColors = Array(LEN_WORDS).fill(COLORS.BLACK);

  //   if (this.props.showColor) {
  //     let answerCharCounts = { ...this.props.answerCharCounts };

  //     // assign colors to each char in guess
  //     // find green letters
  //     // NOTE important that finding green letters is done first in its entirety, otherwise (INFIX, XXXXX), will give first X yellow instead of last X green
  //     this.props.guess.split("").forEach((char, index) => {
  //       if (this.props.answer[index] === char) {
  //         tileColors[index] = COLORS.GREEN;
  //         answerCharCounts[char] -= 1;
  //       }
  //     });

  //     // find yellow letters
  //     this.props.guess.split("").forEach((char, index) => {
  //       if (char in answerCharCounts && answerCharCounts[char] > 0) {
  //         if (tileColors[index] !== COLORS.GREEN) {
  //           tileColors[index] = COLORS.YELLOW;
  //           answerCharCounts[char] -= 1;
  //         }
  //       }
  //     });
  //   }

  //   return (
  //     <div className="row">
  //       {times(LEN_WORDS, (i) => (
  //         <Tile
  //           key={i}
  //           char={this.props.guess?.[i]}
  //           showColor={this.props.showColor}
  //           color={tileColors[i]}
  //           animationName={
  //             tileColors.includes(COLORS.GREEN)
  //               ? "blinker-green"
  //               : tileColors.includes(COLORS.YELLOW)
  //               ? "blinker-yellow"
  //               : "blinker-red"
  //           }
  //         />
  //       ))}
  //     </div>
  //   );
  // }
}

export default Keyboard;
