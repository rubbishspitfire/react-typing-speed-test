import { quotesByDifficulty } from "../data/quotes";

export function getTimeByDifficulty(level) {
  if (level === "easy") return 60;
  if (level === "medium") return 45;
  if (level === "hard") return 30;
  return 60;
}

export function getRandomQuote(level) {
  const selectedQuotes = quotesByDifficulty[level];
  const randomIndex = Math.floor(Math.random() * selectedQuotes.length);
  return selectedQuotes[randomIndex];
}

export function getSavedLeaderboard() {
  const saved = localStorage.getItem("typingLeaderboard");
  return saved ? JSON.parse(saved) : [];
}

export function calculateStats(input, quote, totalTime, timeLeft) {
  if (!quote || quote === "Click start and begin typing...") {
    return {
      correctChars: 0,
      mistakes: 0,
      accuracy: 100,
      wpm: 0,
      progress: 0
    };
  }

  let correctChars = 0;
  let mistakes = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === quote[i]) {
      correctChars++;
    } else {
      mistakes++;
    }
  }

  const accuracy =
    input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  const timeSpent = (totalTime - timeLeft) / 60;
  const wpm = timeSpent > 0 ? Math.round((correctChars / 5) / timeSpent) : 0;

  const progress =
    quote.length > 0 ? Math.min((input.length / quote.length) * 100, 100) : 0;

  return {
    correctChars,
    mistakes,
    accuracy,
    wpm,
    progress
  };
}