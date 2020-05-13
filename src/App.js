/* global chrome */
import React, { useState } from "react";
import "./App.css";
import DrinkTable from "./Table";

function App() {
  const [counter, setCounter] = useState(0);
  const todaysDate = new Date().toDateString();
  const [timeObject, setTimeObject] = useState([]);

  const checkLocal = () => {
    if (counter === 0) {
      if (localStorage.getItem("waterGlass")) {
        const dataCounter = JSON.parse(localStorage.getItem("waterGlass"))
          .amount;
        setCounter(dataCounter);
        const storageTime = JSON.parse(localStorage.getItem("waterGlass"))
          .timeObject;
        setTimeObject(storageTime);
      }
    }
  };

  checkLocal();

  const clickHelper = () => {
    const time = new Date().toTimeString().slice(0, 5);
    const newTimeObject = [
      ...timeObject,
      { glass: counter + 1, time, id: counter },
    ];
    setTimeObject(newTimeObject);
    const data = { amount: counter + 1, todaysDate, timeObject: newTimeObject };
    setCounter(counter + 1);
    localStorage.setItem("waterGlass", JSON.stringify(data));
  };
  const resetHandler = () => {
    localStorage.removeItem("waterGlass");
    setTimeObject([]);
    setCounter(0);
  };

  const waterStyle = {
    height: `${53 * counter}px`,
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="goal">Try to drink 8 cups of water each day!</div>

          <div className="glass">
            <div className="glass-edge"></div>
            <div className="glass-base"></div>
            <div className="water" style={waterStyle}></div>
            <div className="glass-counter" onClick={clickHelper}>
              {counter}
            </div>
          </div>
          <div className="reset-button" onClick={resetHandler}>
            Reset
          </div>
          <div className="credits">
            <a className="credits" href="https://github.com/mobrien829">
              Michael O'Brien
            </a>{" "}
            |{" "}
            <a
              className="credits"
              href="https://github.com/mobrien829/hydration-extension"
            >
              Github repo
            </a>
            <button
              appearance="subtle"
              onClick={() => {
                chrome.tabs.getCurrent((tab) => {
                  chrome.tabs.update(tab.id, {
                    url: "chrome-search://local-ntp/local-ntp.html",
                  });
                });
              }}
            >
              Return to Chrome top pages
            </button>
          </div>
        </div>
        <div className="time-list">
          <DrinkTable data={timeObject} />
        </div>
      </header>
    </div>
  );
}

export default App;
