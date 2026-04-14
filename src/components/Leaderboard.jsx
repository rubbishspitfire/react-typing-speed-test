export default function Leaderboard({ leaderboard, clearLeaderboard }) {
  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Top Scores</h2>
        <button type="button" className="secondary-btn" onClick={clearLeaderboard}>
          Clear Scores
        </button>
      </div>

      {leaderboard.length === 0 ? (
        <p>No saved scores yet. Finish a test to add your first result.</p>
      ) : (
        <ol>
          {leaderboard.map((entry) => (
            <li key={entry.id}>
              <span><strong>{entry.name}</strong></span>
              <span>{entry.wpm} WPM</span>
              <span>{entry.accuracy}%</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}