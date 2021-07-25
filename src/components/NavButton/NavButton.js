import classes from "./NavButton.module.scss";

function NavButton(props) {
  const navbuttonColor = props.sortType === props.children ? "yellow" : "white";
  return (
    <li className={classes.navButton}>
      <div onClick={props.onClick} style={{ color: navbuttonColor }}>
        {props.children}
      </div>
    </li>
  );
}

export default NavButton;
