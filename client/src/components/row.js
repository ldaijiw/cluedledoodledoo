import "bootstrap/dist/css/bootstrap.min.css";
import { times } from "lodash";
import React from "react";
import { COLORS, LEN_WORDS } from "../data/constants";
import "../index.css";
import Tile from "./tile.js";

class Row extends React.Component {
  render() {
    let tileColors = Array(LEN_WORDS).fill(COLORS.BLACK);

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
            animationName={
              tileColors.includes(COLORS.GREEN)
                ? "blinker-green"
                : tileColors.includes(COLORS.YELLOW)
                ? "blinker-yellow"
                : "blinker-red"
            }
          />
        ))}
      </div>
    );
  }
}

export default Row;
