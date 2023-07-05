import * as React from "react";

import App from "./App";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";

const mount = (element, options) => {
  const { onNavigate } = options;

  const history = createMemoryHistory();

  history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, element);
};

const rootElement = document.getElementById("marketing-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  mount(rootElement);
}

export { mount };
