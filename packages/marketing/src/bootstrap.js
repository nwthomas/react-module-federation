import * as React from "react";

import ReactDOM from "react-dom";

const mount = (element) => {
  ReactDOM.render(<h1>Hi there!</h1>, element);
};

const rootElement = document.getElementById("marketing-dev-root");

if (process.env.NODE_ENV === "development" && rootElement) {
  mount(rootElement);
}

export { mount };
