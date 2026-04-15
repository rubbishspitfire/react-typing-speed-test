import { useEffect, useRef } from "react";

export default function QuoteDisplay({
  quote,
  input,
  isRunning,
  progress,
  setInput,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isRunning && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isRunning]);

  function renderQuote() {
    return quote.split("").map((char, index) => {
      let className = "";

      if (index < input.length) {
        className = input[index] === char ? "correct" : "incorrect";
      } else if (index === input.length && isRunning) {
        className = "active";
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }

  function handleChange(e) {
    if (!isRunning) return;

    const nextValue = e.target.value.slice(0, quote.length);
    setInput(nextValue);
  }

  function handlePaste(e) {
    e.preventDefault();
  }

  function handleKeyDown(e) {
    if (e.key === "Tab") {
      e.preventDefault();
    }
  }

  function keepFocus() {
    if (isRunning && textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  return (
    <>
      <div className="quote-box" onClick={keepFocus}>
        {renderQuote()}
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={handleChange}
        onPaste={handlePaste}
        onBlur={keepFocus}
        onKeyDown={handleKeyDown}
        placeholder="Start typing here..."
        rows="6"
        disabled={!isRunning}
      />

      <p className="input-hint">Typing only. Pasting is disabled.</p>
    </>
  );
}