import { useEffect, useState } from "react";
import workerScript from "./worker.js";
import myPromise from "./api/promise.js";

const WorkerExample = () => {
  const [isDataLoaded, setIsDataLoaded] = useState("not Loaded");
  const [isCalculation, setIsCalculation] = useState("not Calculated");

  let worker = new Worker(workerScript);
  useEffect(() => {
    // Create the first web worker
    worker.addEventListener("message", (e) => {
      const type = e.data.type;
      if (type === "loading") {
        const { i, num } = e.data;
        console.log("result", `Loaded ${i} / ${num}`);
      } else {
        const { result } = e.data;
        console.log("result", result);
        setIsCalculation(result);
        // console.timeEnd("Time Unblocked");
      }
    });
  }, []);

  const handleClick = async () => {
    console.time("Time handleClick");
    // console.time("Time Unblocked");
    worker.postMessage(10000);
    // console.time("🌎API FETCHING START");
    const response = await myPromise();
    setIsDataLoaded(response);
    // console.timeEnd("🌎 API FETCHING END");
    console.log("response", response);
    console.timeEnd("Time handleClick");
  };
  return (
    <div>
      <button onClick={handleClick}>Web Workers Unblock Example</button>
      <p> API RESPOSE COMPLETED - {JSON.stringify(isDataLoaded)}</p>
      <p> CALUCATED COMPLETED - {JSON.stringify(isCalculation)}</p>
    </div>
  );
};

export default WorkerExample;
