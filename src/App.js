import { Fragment } from "react";
import "./App.css";
import BarPanel from "./components/BarPanel";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <BarPanel />
    </Fragment>
  );
}

export default App;
