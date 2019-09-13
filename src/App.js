import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Navbar from "./components/Narbar";
import { Login, Signup } from "./components/login/";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default App;
