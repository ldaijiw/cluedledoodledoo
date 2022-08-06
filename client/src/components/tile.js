import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "../index.css";

class Tile extends React.Component {
  render() {
    return (
      <div
        className="tile"
        style={{
          backgroundColor: this.props.color,
          transition: this.props.showColor ? "background-color 1s" : "none",
        }}
      >
        <div
          className="tile-text"
          style={{
            animation: this.props.showColor
              ? `${this.props.animationName} 1s linear`
              : "none",
          }}
        >
          {this.props.char}
        </div>
      </div>
    );
  }
}

export default Tile;
