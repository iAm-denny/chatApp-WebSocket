import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Form from "./components/Form";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Form} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
