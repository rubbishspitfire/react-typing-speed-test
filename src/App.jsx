import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import QuoteDisplay from "./components/QuoteDisplay";
import Stats from "./components/Stats";
import Leaderboard from "./components/Leaderboard";
import {
  calculateStats,
  getRandomQuote,
  getSavedLeaderboard,
  getTimeByDifficulty
} from "./utils/typingUtils";

export default function App() {
  const [difficulty, setDifficulty] = useState("easy");
  const [quote, setQuote] = useState("Click start and begin typing...");
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [leaderboard, setLeaderboard] = useState(() => getSavedLeaderboard());
  const successAudioRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("typingLeaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const stats = useMemo(() => {
    return calculateStats(input, quote, totalTime, timeLeft);
  }, [input, quote, totalTime, timeLeft]);

  useEffect(() => {
    if (!isRunning) return;

    if (input === quote) {
      finishTest();
    }
  }, [input, quote, isRunning]);

  useEffect(() => {
    if (!isFinished || quote === "Click start and begin typing...") return;
    if (stats.wpm <= 0) return;

    const newEntry = {
      id: Date.now(),
      difficulty,
      wpm: stats.wpm,
      accuracy: stats.accuracy
    };

    setLeaderboard((prev) => {
      return [...prev, newEntry]
        .sort((a, b) => {
          if (b.wpm !== a.wpm) return b.wpm - a.wpm;
          return b.accuracy - a.accuracy;
        })
        .slice(0, 5);
    });
  }, [isFinished, quote, difficulty, stats.wpm, stats.accuracy]);

  function startTest() {
    const newTime = getTimeByDifficulty(difficulty);
    const newQuote = getRandomQuote(difficulty);

    setQuote(newQuote);
    setInput("");
    setTotalTime(newTime);
    setTimeLeft(newTime);
    setIsRunning(true);
    setIsFinished(false);
  }

  function finishTest() {
    setIsRunning(false);
    setIsFinished(true);

    if (soundEnabled && successAudioRef.current) {
      successAudioRef.current.currentTime = 0;
      successAudioRef.current.play().catch(() => {});
    }
  }

  function resetTest() {
    setQuote("Click start and begin typing...");
    setInput("");
    setTimeLeft(60);
    setTotalTime(60);
    setIsRunning(false);
    setIsFinished(false);
  }

  function clearLeaderboard() {
    setLeaderboard([]);
  }

  return (
    <div className="app">
      <div className="container">
        <Header
          theme={theme}
          setTheme={setTheme}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />

        <Controls
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          isRunning={isRunning}
          startTest={startTest}
          resetTest={resetTest}
        />

        <QuoteDisplay
          quote={quote}
          input={input}
          isRunning={isRunning}
          progress={stats.progress}
          setInput={setInput}
          soundEnabled={soundEnabled}
        />

        <Stats
          timeLeft={timeLeft}
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          mistakes={stats.mistakes}
        />

        {isFinished && (
  <div className="result-box">
    <h2>Test Complete</h2>
    <p>Nice work — here’s your final result.</p>

    <div className="result-grid">
      <div className="result-pill">
        <strong>{stats.wpm}</strong>
        <div>WPM</div>
      </div>

      <div className="result-pill">
        <strong>{stats.accuracy}%</strong>
        <div>Accuracy</div>
      </div>

      <div className="result-pill">
        <strong>{difficulty}</strong>
        <div>Difficulty</div>
      </div>
    </div>
  </div>
)}

        <Leaderboard
          leaderboard={leaderboard}
          clearLeaderboard={clearLeaderboard}
        />

        <audio ref={successAudioRef} src="/success.mp3" preload="auto" />
      </div>
    </div>
  );
}