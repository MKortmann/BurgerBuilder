import React, { Component } from "react";
import { connect } from "react-redux";
// you could also omit index here
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

import { Link } from "react-router-dom";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandling/withErrorHandling";

class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      },0);

      return  sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true})
    } else {
      this.props.history.push("/auth");
    }

  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    };
    for (let itemKey in disabledInfo) {
      disabledInfo[itemKey] = disabledInfo[itemKey] <= 0
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />

    if (this.props.ings) {
      burger =  (
        <Aux>
          <Burger ingredients={this.props.ings}/>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}/>
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price = {this.props.price}
        purchaseCancelled = {this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler}
        />
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
      	{burger}
      </Aux>
    );
  }
}


const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
