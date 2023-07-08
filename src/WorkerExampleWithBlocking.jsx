import { useState } from "react";
import myPromise from "./api/promise.js";

const WorkerExampleWithBlocking = () => {
  const [isDataLoaded, setIsDataLoaded] = useState("not Loaded");
  const [isCalculation, setIsCalculation] = useState("not Calculated");
  const handleBlockingLogic = async (num) => {
    let result = 0;
    for (let i = 1; i <= num; i++) {
      const data = { type: "loading", i, num };
      postMessage(JSON.parse(JSON.stringify(data)));
      for (let j = 0; j < i; j++) {
        result++;
      }
    }
    const data = {
      type: "result",
      result,
    };
    setIsCalculation(data);
    return data;
  };

  const handleClick = async () => {
    console.time("Time handleClick");
    handleBlockingLogic(10000);
    // console.time("🌎API FETCHING START");
    const response = await myPromise();
    // console.timeEnd("🌎 API FETCHING END");
    console.log("response", response);
    setIsDataLoaded(response);
    console.timeEnd("Time handleClick");
  };
  return (
    <div>
      <button onClick={handleClick}>Web Workers Block Example</button>
      <p> API RESPOSE COMPLETED - {JSON.stringify(isDataLoaded)}</p>
      <p> CALUCATED COMPLETED - {JSON.stringify(isCalculation)}</p>
    </div>
  );
};

export default WorkerExampleWithBlocking;
