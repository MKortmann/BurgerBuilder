import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (

  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.clicked} />
    <Logo height="80%"/>
    <nav className={classes.DesktopOnly}>
        <NavigationItems />
    </nav>
  </header>
);

export default toolbar;