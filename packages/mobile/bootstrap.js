import * as React from "react";

import App from "./App";
import ReactDOM from "react-dom";

const mount = element => {
  ReactDOM.render(<App />, element);
};

const rootElement = document.getElementById("mobile-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  mount(rootElement);
}

export { mount };
