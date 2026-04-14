export default function Stats({ timeLeft, wpm, accuracy, mistakes }) {
  return (
    <div className="stats">
      <div className="stat-card">
        <span className="stat-label">Time Left</span>
        <span className="stat-value">{timeLeft}s</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">WPM</span>
        <span className="stat-value">{wpm}</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Accuracy</span>
        <span className="stat-value">{accuracy}%</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Mistakes</span>
        <span className="stat-value">{mistakes}</span>
      </div>
    </div>
  );
}