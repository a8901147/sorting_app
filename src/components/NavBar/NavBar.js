import { useDispatch, useSelector } from "react-redux";
import NavButton from "../NavButton/NavButton";
import classes from "./NavBar.module.scss";
import { arrayActions } from "../../store/array";
import SortingType from "../../function/sortingType";
import Slider from "../Slider/Slider";
import NavNumber from "../NavNumber/NavNumber";
import { sleep } from "../../function/sleep";

function NavBar(props) {
  const dispatch = useDispatch();
  const delay = useSelector((state) => state.array.delay);
  const number_of_array_bars = useSelector(
    (state) => state.array.number_of_array_bars
  );
  const totalCounter = useSelector((state) => state.array.totalCounter);

  const recursive = async (Counter) => {
    console.log(Counter);
    if (Counter === 0) {
      return;
    }
    console.log(Counter);
    dispatch(arrayActions.bubble_Green());
    await sleep(delay);
    dispatch(arrayActions.bubble_Swap());
    await sleep(delay);
    dispatch(arrayActions.bubble_Finish());
    await sleep(delay);
    Counter--;
    recursive(Counter);
  };

  const generateArrayHandler = () => {
    dispatch(
      arrayActions.resetArray({
        number_of_array_bars: number_of_array_bars,
      })
    );
  };

  const startSortingHandler = () => {
    recursive(totalCounter);
  };
  const bubbleSortHandler = () => {
    dispatch(arrayActions.resetSortType(SortingType.BUBBLE_SORT));
  };
  const selectionSort = () => {
    dispatch(arrayActions.resetSortType(SortingType.SELECTION_SORT));
  };
  const mergeSortHandler = () => {
    dispatch(arrayActions.resetSortType(SortingType.MERGE_SORT));
  };

  return (
    <ul className={classes.navBar}>
      <NavButton onClick={generateArrayHandler}>Generate New Array</NavButton>
      <NavButton onClick={bubbleSortHandler} sortType={props.sortType}>
        {SortingType.BUBBLE_SORT}
      </NavButton>
      <NavButton onClick={selectionSort} sortType={props.sortType}>
        {SortingType.SELECTION_SORT}
      </NavButton>
      <NavButton onClick={mergeSortHandler} sortType={props.sortType}>
        {SortingType.MERGE_SORT}
      </NavButton>
      <NavButton onClick={startSortingHandler}>Sort!</NavButton>
      <Slider sortType={props.sortType}></Slider>
      <NavNumber>{`Array Number: ${number_of_array_bars}`}</NavNumber>
    </ul>
  );
}

export default NavBar;
