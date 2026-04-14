export default function Header({ theme, setTheme, soundEnabled, setSoundEnabled }) {
  return (
    <>
      <h1>Typing Speed Test</h1>
      <p className="subtitle">
        Practice accuracy, increase speed, and track your best scores.
      </p>

      <div className="top-bar">
        <button
          type="button"
          className="secondary-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button
          type="button"
          className="secondary-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? "Sound On" : "Sound Off"}
        </button>
      </div>
    </>
  );
}