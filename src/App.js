import React from "react";
import Weather from "./Weather";
import "./style.css";

function App() {
  return (
    <div className="App">
      <h1 className="title">
        <span className="title_w-letter">W</span>hat{" "}
        <span className="title_w-letter">W</span>eather in the{" "}
        <span className="title_w-letter">W</span>orld
      </h1>
      <Weather />
    </div>
  );
}

export default App;
