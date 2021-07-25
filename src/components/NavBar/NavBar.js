import { useDispatch } from "react-redux";
import NavButton from "../NavButton/NavButton";
import classes from "./NavBar.module.scss";
import { arrayActions } from "../../store/array";
import SortingType from "../../function/sortingType";
import Slider from "../Slider/Slider";
import NavNumber from "../NavNumber/NavNumber";

function NavBar(props) {
  const dispatch = useDispatch();

  const recursive = (i) => {
    console.log(i);
    console.log(`Speed ${props.delay}`);

    if (i === 1) return;
    setTimeout(() => {
      // level 1
      dispatch(arrayActions.sortArray());
      setTimeout(() => {
        // level 2
        dispatch(arrayActions.stop());
        setTimeout(() => {
          // level 3
          dispatch(arrayActions.swap());
          setTimeout(() => {
            // level 4
            dispatch(arrayActions.goNext());
            recursive(--i);
          }, props.delay);
        }, props.delay);
      }, props.delay);
    }, props.delay);
  };

  const generateArrayHandler = () => {
    dispatch(
      arrayActions.resetArray({
        number_of_array_bars: props.number_of_array_bars,
        sortType: props.sortType,
        delay: props.delay,
      })
    );
  };

  const startSortingHandler = () => {
    const swapTimes = props.number_of_array_bars * props.number_of_array_bars;
    recursive(swapTimes);
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
      <NavNumber>{`Array Number: ${props.number_of_array_bars}`}</NavNumber>
    </ul>
  );
}

export default NavBar;
