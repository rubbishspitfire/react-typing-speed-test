export default function Stats({ timeLeft, wpm, accuracy, mistakes }) {
  return (
    <div className="stats">
      <p>Time Left: <span>{timeLeft}</span>s</p>
      <p>WPM: <span>{wpm}</span></p>
      <p>Accuracy: <span>{accuracy}</span>%</p>
      <p>Mistakes: <span>{mistakes}</span></p>
    </div>
  );
}