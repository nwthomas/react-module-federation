import * as React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Header from "./components/Header";
import Progress from "./components/Progress";

const MarketingLazyApp = React.lazy(() => import("./components/MarketingApp"));
const AuthLazyApp = React.lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

function App() {
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header />
        <React.Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" component={AuthLazyApp} />
            <Route path="/" component={MarketingLazyApp} />
          </Switch>
        </React.Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
}

export default App;
