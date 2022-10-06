import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useMachine } from "@xstate/react";
import { feedbackMachine } from "./machine";
import FeedbackInitialBar from "./FeedbackPanel";
import FeedbackForm from "./FeedbackForm";

function App() {
  const handleClick = (feedback) => {
    send({
      type: "SUBMIT",
      value: feedback
    });
  };

  const [current, send] = useMachine(feedbackMachine);

  return (
    <div className="App">
      <h1>
        Feedback form modelled from
        <a
          href="https://discovermybenefits.mod.gov.uk/royal-navy/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discover my Benefits (bottom of page)
        </a>
      </h1>
      <p>
        Note: Submit event has been modelled locally to reject randomly to test
        error states
      </p>
      {!(
        current.matches("formPanelSuccess") || current.matches("initialSuccess")
      ) && <button onClick={() => send("RESET")}>Reset state</button>}

      <p className="btn-tab" type="button">
        Current state:{JSON.stringify(current.value)}
      </p>
      {current.matches("idle") && (
        <FeedbackInitialBar handleClick={handleClick} />
      )}
      {current.matches("submitting") && (
        <div className="feedback-panel bg-secondary-beta text-white">
          <p>Submitting form...</p>
        </div>
      )}
      {current.matches("formPanel") && (
        <FeedbackForm send={send} current={current} />
      )}
      {current.matches("initialSuccess") && (
        <div className="feedback-panel bg-secondary-beta text-white">
          <p>Thankyou for your feedback</p>
        </div>
      )}
      {current.matches("initialError") && (
        <div className="feedback-panel text-white">
          <div className="feedback-panel-stage-1 bg-secondary-beta ">
            <p> Error in submission (initial call)</p>
          </div>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
