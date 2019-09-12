import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";


const layout = ( props ) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    SideDrawer, Backdrop
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;
