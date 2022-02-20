import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";

import ListStack from "./pages/ListStack";
import NotFound from "./pages/NotFound";
import Notify from "./pages/Notify";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <ListStack />
        </Route>
        <Route path="/notify">
          <Notify />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
