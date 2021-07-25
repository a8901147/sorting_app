import classes from "./NavNumber.module.scss";

function NavNumber(props) {
  return (
    <li className={classes.navNumber}>
      <div>{props.children}</div>
    </li>
  );
}

export default NavNumber;
