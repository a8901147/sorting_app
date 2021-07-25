import classes from "./Bar.module.scss";
import Status from "../function/status";

function Bar(props) {
  const height = Math.round((props.children / 700) * 100);
  const barBackgroundColor =
    props.status === Status.WAITING
      ? "#607D8B"
      : props.status === Status.STOPING
      ? "#D32F2F"
      : props.status === Status.FINISHING
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
