import "./App.css";
import WorkerExample from "./WorkerExample";
import WorkerExampleWithBlocking from "./WorkerExampleWithBlocking";

function App() {
  return (
    <>
      <div>
        <WorkerExample />
        {/* <WorkerExampleWithBlocking /> */}
      </div>
    </>
  );
}

export default App;
