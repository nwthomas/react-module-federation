import * as React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "../components/Landing";
import Pricing from "../components/Pricing";
import { StylesProvider } from "@material-ui/core/styles";

function App() {
  return (
    <div>
      <StylesProvider>
        <BrowserRouter>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </BrowserRouter>
      </StylesProvider>
    </div>
  );
}

export default App;
