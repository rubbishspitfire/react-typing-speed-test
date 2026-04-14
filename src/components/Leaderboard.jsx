export default function Leaderboard({ leaderboard, clearLeaderboard }) {
  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2>Top Scores</h2>
        <button onClick={clearLeaderboard}>Clear</button>
      </div>

      {leaderboard.length === 0 ? (
        <p>No scores yet. Finish a test to save one.</p>
      ) : (
        <ol>
          {leaderboard.map((entry) => (
            <li key={entry.id}>
              <span>{entry.wpm} WPM</span>
              <span>{entry.accuracy}% Accuracy</span>
              <span>{entry.difficulty}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}