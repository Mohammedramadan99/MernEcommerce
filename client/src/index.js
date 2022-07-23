import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./Market/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Market/redux/Store";

const loadingMarkup = <div className="loading">loading ...</div>;
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
