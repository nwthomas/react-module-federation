import * as React from "react";

import App from "./App";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";

const mount = (element, options) => {
  const { onNavigate } = options;

  const history = createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, element);

  return {
    onParentNavigate(location) {
      const { pathname: nextPathname } = location;
      const { pathname: currentPathname } = history.location;

      if (nextPathname !== currentPathname) {
        history.push(nextPathname);
      }
    },
  };
};

const rootElement = document.getElementById("marketing-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  mount(rootElement, {});
}

export { mount };
