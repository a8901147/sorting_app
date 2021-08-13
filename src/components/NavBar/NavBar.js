import { useDispatch, useSelector } from "react-redux";
import NavButton from "../NavButton/NavButton";
import classes from "./NavBar.module.scss";
import { bubbleSortActions } from "../../store/bubbleSortReducer";
import { basicActions } from "../../store/basic";
import SortingType from "../../function/sortingType";
import Slider from "../Slider/Slider";
import NavNumber from "../NavNumber/NavNumber";
import { sleep } from "../../function/sleep";
import { delayValue } from "../../function/initial";
import { selectionSortActions } from "../../store/selectionSortReducer";
import { mergeSortActions } from "../../store/mergeSortReducer";

function NavBar() {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.basic.sortType);

  const bubble_number_of_array_bars = useSelector(
    (state) => state.bubble.number_of_array_bars
  );
  const select_number_of_array_bars = useSelector(
    (state) => state.select.number_of_array_bars
  );
  const merge_number_of_array_bars = useSelector(
    (state) => state.merge.number_of_array_bars
  );

  const number_of_array_bars =
    sortType === SortingType.BUBBLE_SORT
      ? bubble_number_of_array_bars
      : sortType === SortingType.BUBBLE_SORT
      ? select_number_of_array_bars
      : merge_number_of_array_bars;
  const delay = delayValue(number_of_array_bars);
  const bubbleTotalCounter = useSelector((state) => state.bubble.totalCounter);
  const selectTotalCounter = useSelector((state) => state.select.totalCounter);

  const bubbleSort_recursive = async (Counter) => {
    if (Counter === 0) {
      return;
    }
    dispatch(bubbleSortActions.bubble_Check());
    await sleep(delay);
    dispatch(bubbleSortActions.bubble_Swap());
    await sleep(delay);
    dispatch(bubbleSortActions.bubble_Finish());
    await sleep(delay);
    Counter--;
    bubbleSort_recursive(Counter);
  };

  const selectionSort_recursive = async (Counter) => {
    console.log(Counter);
    if (Counter === 0) {
      return;
    }
    dispatch(selectionSortActions.Selection_CheckAndUpdate());
    await sleep(delay);
    dispatch(selectionSortActions.Selection_Swap());
    await sleep(delay);
    dispatch(selectionSortActions.Selection_Finish());
    await sleep(delay);

    Counter--;
    selectionSort_recursive(Counter);
  };

  const generateArrayHandler = () => {
    if (sortType === SortingType.BUBBLE_SORT) {
      dispatch(
        bubbleSortActions.resetArray({
          number_of_array_bars: number_of_array_bars,
        })
      );
    } else if (sortType === SortingType.SELECTION_SORT) {
      dispatch(
        selectionSortActions.resetArray({
          number_of_array_bars: number_of_array_bars,
        })
      );
    } else if (sortType === SortingType.MERGE_SORT) {
      dispatch(
        mergeSortActions.resetArray({
          number_of_array_bars: number_of_array_bars,
        })
      );
    }
  };
  async function mergeSort_recursive(startPoint, arrayLength) {
    if (arrayLength === 1) {
      return { startPoint: startPoint, length: arrayLength };
    }

    const mid = Math.ceil(arrayLength / 2);

    const arrayLeft_startPoint = startPoint;
    const arrayRight_startPoint = startPoint + mid;
    const arrayLeft_length = mid;
    const arrayRight_length = arrayLength - mid;
    const array_l = await mergeSort_recursive(
      arrayLeft_startPoint,
      arrayLeft_length
    );
    const array_r = await mergeSort_recursive(
      arrayRight_startPoint,
      arrayRight_length
    );

    return mergeArray(array_l, array_r);
  }

  async function mergeArray(arrayLeft, arrayRight) {
    await sleep(delay);
    dispatch(
      mergeSortActions.merge_sort({
        arrayLeft: arrayLeft,
        arrayRight: arrayRight,
      })
    );
    return {
      startPoint: arrayLeft.startPoint,
      length: arrayLeft.length + arrayRight.length,
    };
  }

  const startSortingHandler = async () => {
    if (sortType === SortingType.BUBBLE_SORT) {
      bubbleSort_recursive(bubbleTotalCounter);
    } else if (sortType === SortingType.SELECTION_SORT) {
      selectionSort_recursive(selectTotalCounter);
    } else if (sortType === SortingType.MERGE_SORT) {
      await mergeSort_recursive(0, merge_number_of_array_bars);
      dispatch(mergeSortActions.merge_finish());
    }
  };
  const bubbleSortHandler = () => {
    dispatch(basicActions.resetSortType(SortingType.BUBBLE_SORT));
  };
  const selectionSort = () => {
    dispatch(basicActions.resetSortType(SortingType.SELECTION_SORT));
  };
  const mergeSortHandler = () => {
    dispatch(basicActions.resetSortType(SortingType.MERGE_SORT));
  };

  return (
    <ul className={classes.navBar}>
      <NavButton onClick={generateArrayHandler}>Generate New Array</NavButton>
      <NavButton onClick={bubbleSortHandler} sortType={sortType}>
        {SortingType.BUBBLE_SORT}
      </NavButton>
      <NavButton onClick={selectionSort} sortType={sortType}>
        {SortingType.SELECTION_SORT}
      </NavButton>
      <NavButton onClick={mergeSortHandler} sortType={sortType}>
        {SortingType.MERGE_SORT}
      </NavButton>
      <NavButton onClick={startSortingHandler}>Sort!</NavButton>
      <Slider sortType={sortType}></Slider>
      <NavNumber>{`Array Number: ${number_of_array_bars}`}</NavNumber>
    </ul>
  );
}

export default NavBar;
