import React from "react";
import "../App.css";

const GuessLine = ({ guess, solution, isFinal }) => {
  return (
    <div className="line">
      {guess.split("").map((char, i) => {
        let className = "tile";

        if (isFinal) {
          if (char === solution[i].toLowerCase()) {
            className += " correct";
          } else if (solution.toLowerCase().includes(char)) {
            className += " close";
          } else {
            className += " incorrect";
          }
        }

        return (
          <div key={i} className={className}>
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default GuessLine;
