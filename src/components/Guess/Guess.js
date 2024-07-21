import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Cell({ letter, status }) {
  const className = status ? `cell ${status}` : "cell";
  return <span className={className}>{letter}</span>;
}

function Guess({ guess, answer }) {
  const result = checkGuess(guess, answer);

  return (
    <p className="guess">
      {range(5).map((cell) => (
        <Cell
          key={cell}
          letter={guess[cell] ? result[cell].letter : undefined}
          status={guess[cell] ? result[cell].status : undefined}
        />
      ))}
    </p>
  );
}

export default Guess;
