import React from "react";
import classes from "./navigationitems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (


  <React.Fragment>
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {props.isAuthenticated
        ? <NavigationItem link="/orders">Orders</NavigationItem>
        : null
      }
      {props.isAuthenticated
        ? <NavigationItem link="/logout">Logout</NavigationItem>
        : <NavigationItem link="/auth">Authenticate</NavigationItem>
      }
    </ul>
  </React.Fragment>
);

export default navigationItems;
