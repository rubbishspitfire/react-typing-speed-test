export default function Header({ theme, setTheme, soundEnabled, setSoundEnabled }) {
  return (
    <>
      <h1>Typing Speed Test</h1>

      <div className="top-bar">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button onClick={() => setSoundEnabled(!soundEnabled)}>
          {soundEnabled ? "Sound On" : "Sound Off"}
        </button>
      </div>
    </>
  );
}