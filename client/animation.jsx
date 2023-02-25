import React, { useCallback } from "https://cdn.skypack.dev/react@17";
import { render } from "https://cdn.skypack.dev/react-dom@17";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";
function App() {
  const onClick = useCallback(() => {
    confetti({
      particleCount: 190,
      spread: 80
    });
  }, []);
  return (
    <button className="button" onClick={onClick}>
      <span>Submit</span>
    </button>
  );
}
render(<App />, document.getElementById("root"));
