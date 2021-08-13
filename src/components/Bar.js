import classes from "./Bar.module.scss";
import BarStatus from "../function/barStatus";

function Bar(props) {
  const height = Math.ceil((props.children / 700) * 100);
  const barBackgroundColor =
    props.status === BarStatus.WAITING
      ? "#607D8B"
      : props.status === BarStatus.STOPING
      ? "#D32F2F"
      : props.status === BarStatus.FINISHING
      ? "#FFC107"
      : "#4CAF50"; // purple

  //console.log("gererate bar " + height);
  return (
    <div
      className={classes.bar}
      style={{ gridRowEnd: height, backgroundColor: barBackgroundColor }}
    >
      <p className={classes.bar__text}>{props.children}</p>
    </div>
  );
}

export default Bar;
