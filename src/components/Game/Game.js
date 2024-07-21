import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessList from "../GuessList/GuessList";
import HappyBanner from "../HappyBanner/HappyBanner";
import SadBanner from "../SadBanner/SadBanner";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = useState([]);
  const [guess, setGuess] = useState([]);
  const [status, setStatus] = useState("playing");

  function handleSubmit(event) {
    event.preventDefault();
    if (!guess) {
      return;
    }

    if (guesses.length >= 6) {
      setStatus("lost");
      return;
    }

    setGuesses([...guesses, guess]);
    if (guess === answer) {
      setStatus("won");
    } else if (guesses.length === NUM_OF_GUESSES_ALLOWED) {
      setStatus("lost");
    }
  }

  function handleChange(event) {
    setGuess(event.target.value.toUpperCase());
  }

  return (
    <>
      <GuessList guesses={guesses} answer={answer} />
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          value={guess}
          onChange={handleChange}
          disabled={status !== "playing" || guesses.length >= 6}
          pattern="[a-zA-Z]{5}"
          title="5 letter word"
        />
      </form>
      {status === "won" && <HappyBanner numOfGuesses={guesses.length} />}
      {status === "lost" && <SadBanner answer={answer} />}
    </>
  );
}

export default Game;
