export default function Controls({
  difficulty,
  setDifficulty,
  isRunning,
  startTest,
  resetTest
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

      <div className="buttons">
        <button onClick={startTest}>Start Test</button>
        <button onClick={resetTest}>Reset</button>
      </div>
    </>
  );
}