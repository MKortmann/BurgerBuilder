import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";


const layout = ( props ) => (
  <Aux>
    <Toolbar>Toolbar</Toolbar>
    SideDrawer, Backdrop
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;
