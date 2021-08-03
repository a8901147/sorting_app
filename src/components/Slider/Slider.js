import { useRef } from "react";
import { useDispatch } from "react-redux";
import classes from "./Slider.module.scss";
import { arrayActions } from "../../store/array";

function Slider(props) {
  const arraySize = useRef();
  const dispatch = useDispatch();
  const changeHandler = () => {
    dispatch(
      arrayActions.resetArray({
        number_of_array_bars: arraySize.current.value,
      })
    );
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
