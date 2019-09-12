import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import { Login } from "./components/login/";

function App() {
  return (
    <Router>
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
