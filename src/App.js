import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Navbar from "./components/Narbar";
import { Course } from "./components/courses/";
import { Login, Signup } from "./components/login/";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/course" component={Course} />
    </Router>
  );
}

export default App;
