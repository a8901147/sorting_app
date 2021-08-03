import { useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./Slider.module.scss";
import { bubbleSortActions } from "../../store/bubbleSortReducer";
import { selectionSortActions } from "../../store/selectionSort";
import sortingType from "../../function/sortingType";

function Slider(props) {
  const arraySize = useRef();
  const dispatch = useDispatch();
  const changeHandler = () => {
    if (props.sortType === sortingType.BUBBLE_SORT) {
      console.log("a");
      dispatch(
        bubbleSortActions.resetArray({
          number_of_array_bars: arraySize.current.value,
        })
      );
    } else if (props.sortType === sortingType.SELECTION_SORT) {
      console.log("b");
      dispatch(
        selectionSortActions.resetArray({
          number_of_array_bars: arraySize.current.value,
        })
      );
    }
  };

  return (
    <li className={classes.slidecontainer}>
      <input
        onChange={changeHandler}
        ref={arraySize}
        type="range"
        min="3"
        max="100"
        defaultValue="50"
        className={classes.slider}
        id="myRange"
      ></input>
    </li>
  );
}

export default Slider;
