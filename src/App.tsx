import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./components/data/words";
import GuessLine from "./components/GuessLine";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
const NUM_GUESSES = 6;
const WORD_LENGHT = 5;

function App() {
  const [guesses, setGuesses] = useState(Array(NUM_GUESSES).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");

  const [solution, setSolution] = useState<string | null>(null);

  // fetch data
  useEffect(() => {
    const fetchSolution = async () => {
      // const response = await fetch(WORD_LIST_API_URL);
      // const words = await response.json();

      setSolution(words[Math.floor(Math.random() * words.length)]);
    };

    fetchSolution();
  }, []);

  useEffect(() => {
    if (solution == null) return;
    console.log(solution)

    const onPressKey = (event) => {
      // if we already guessed
      if (guesses[NUM_GUESSES - 1] != null || guesses.includes(solution)) {
        return;
      }

      const charCode = event.key.toLowerCase().charCodeAt(0);
      const isLetter = event.key.length === 1 && charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0);

      setCurrentGuess((prevGuess) => {
        if (event.key === "Backspace") {
          return prevGuess.slice(0, -1);
        } else if (event.key === "Enter" && prevGuess.length === WORD_LENGHT) {
          const currentGuessIndex = guesses.findIndex((guess) => guess == null);
          const guessesClone = [...guesses];

          guessesClone[currentGuessIndex] = prevGuess;
          setGuesses(guessesClone);

          return "";
        } else if (prevGuess.length < WORD_LENGHT && isLetter) {
          return prevGuess + event.key.toLowerCase();
        }
        return prevGuess;
      });
    };

    window.addEventListener("keydown", onPressKey);
    return () => window.removeEventListener("keydown", onPressKey);
  }, [solution, guesses]);

  const currentGuessIndex = guesses.findIndex((guess) => guess == null);

  if (solution == null) {
    return null;
  }

  return (
    <div className="board">
      {guesses.map((guess, i) => {
        return (
          <GuessLine
            key={i}
            guess={(i === currentGuessIndex ? currentGuess : guess ?? "").padEnd(WORD_LENGHT)}
            solution={solution}
            isFinal={currentGuessIndex > i || currentGuessIndex === -1}
          />
        );
      })}
    </div>
  );
}

export default App;
