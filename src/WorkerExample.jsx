import React, { useEffect } from "react";
import workerScript from "./worker.js";

const App = () => {
  let worker = new Worker(workerScript);
  useEffect(() => {
    // Create the first web worker
    worker.addEventListener("message", (e) => {
      debugger;
      const type = e.data.type;
      if (type === "loading") {
        const { i, num } = e.data;
        console.log("result", `Loaded ${i} / ${num}`);
      } else {
        const { result } = e.data;
        console.log("result", result);
      }
    });
  }, []);

  const handleClick = () => {
    worker.postMessage(5);
  };
  return (
    <div>
      <button onClick={handleClick}>Web Workers Example</button>
    </div>
  );
};

export default App;
