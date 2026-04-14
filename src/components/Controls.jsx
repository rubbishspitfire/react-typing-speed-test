export default function Controls({
  difficulty,
  setDifficulty,
  isRunning,
  startTest,
  resetTest,
  playerName,
  setPlayerName
}) {
  return (
    <>
      <div className="difficulty-box">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isRunning}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* NEW: Player name input */}
      <div className="difficulty-box">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          className="name-input"
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          disabled={isRunning}
        />
      </div>

      <div className="buttons">
        <button type="button" onClick={startTest}>
          Start Test
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={resetTest}
        >
          Reset
        </button>
      </div>
    </>
  );
}