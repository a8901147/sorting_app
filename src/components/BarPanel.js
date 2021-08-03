import classes from "./BarPanel.module.scss";
import Bar from "./Bar";
import { useSelector } from "react-redux";
import sortingType from "../function/sortingType";

function BarPanel(props) {
  const bubbleBarArray = useSelector((state) => state.bubble.barArray);
  const selectBarArray = useSelector((state) => state.select.barArray);
  let barArray = [];
  const sortType = useSelector((state) => state.basic.sortType);
  if (sortType === sortingType.BUBBLE_SORT) {
    barArray = bubbleBarArray;
  } else if (sortType === sortingType.SELECTION_SORT) {
    barArray = selectBarArray;
  }
  return (
    <div className={classes.barPanel}>
      {barArray.map((item) => (
        <Bar key={item.id} status={item.status}>
          {item.number}
        </Bar>
      ))}
    </div>
  );
}

export default BarPanel;
