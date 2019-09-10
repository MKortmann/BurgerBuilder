import React, { Component } from "react";
import classes from "./burgeringredient.module.css";
import PropTypes from "prop-types";

class BurgerIngredient extends Component {

  render ()
  {
    let ingredient = null;
    switch ( this.props.type ) {
      case ("bread-bottom"):
        ingredient = <div className={classes.BreadBottom}></div>;
        break;
      case ("bread-top"):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}</div>
            <div className={classes.Seeds2}</div>
          </div>;
        ):
        break;
      case ("meat"):
        ingredient = <div className={classes.Meat};
        break;
      case ("heese"):
        ingredient = <div className={classes.Cheese};
        break;
      case ("salad"):
        ingredient = <div className={classes.Salad};
        break;
      case ("bacon"):
        ingredient = <div className={classes.Salad};
        break;
      default:
        ingredient = null;
        break;
    }
    return ingredient;
  }
}


burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
