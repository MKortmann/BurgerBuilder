import React from "react";
import classes from "./navigationitems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (


  <React.Fragment>
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  </React.Fragment>
);

export default navigationItems;
