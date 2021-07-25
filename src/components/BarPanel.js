import classes from "./BarPanel.module.scss";
import Bar from "./Bar";
import { useSelector } from "react-redux";

function BarPanel(props) {
  const barArray = useSelector((state) => state.array.barArray);

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
