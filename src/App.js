import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// components
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="*">
            <Header />
            <h1 style={{ textAlign: "center", marginTop: "10vh" }}>
              error 404 (page not found)
            </h1>
            <div
              style={{ position: "fixed", bottom: "0", width: "100%" }}
            ></div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
