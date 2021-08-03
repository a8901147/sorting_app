import { Fragment } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import BarPanel from "./components/BarPanel";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const sortType = useSelector((state) => state.array.sortType);
  const sortingCounter = useSelector((state) => state.array.sortingCounter);
  const barArray = useSelector((state) => state.array.barArray);

  return (
    <Fragment>
      <NavBar
        sortType={sortType}
        sortingCounter={sortingCounter}
        barArray={barArray}
      />
      <BarPanel sortType={sortType} sortingCounter={sortingCounter} />
    </Fragment>
  );
}

export default App;
