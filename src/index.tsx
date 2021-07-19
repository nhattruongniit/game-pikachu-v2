import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./services/i18n";
import SoundProvider from "./components/SoundProvider";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <SoundProvider>
        <Router>
          <App />
        </Router>
      </SoundProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
