import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./auth.module.css";
import * as action from "../../store/actions/index";
import { Redirect } from "react-router-dom";



class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  checkValidity(value, rules) {
    let isValid = true;

    if(rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }


  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value,
            this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup);
  }


  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  }
  render () {
    const formElementsArray = [];
    // In the end formElementArray with be an arrays with two objects: email and
    // password. the id is the email and password.
    // (2) [{…}, {…}]
    // 0: {id: "email", config: {…}}
    // 1: {id: "password", config: {…}}
    // The data and setup are in the config!
    // config:
    // elementConfig: {type: "email", placeholder: "Mail Address"}
    // elementType: "input"
    // touched: false
    // valid: false
    // validation: {required: true, isEmail: true}
    // value: ""
    // __proto__: Object
    // id: "email"

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event)=>this.inputChangedHandler(event, formElement.id)}
        />
    ));

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>

          <Button
            clicked={this.switchAuthModeHandler}
            btnType="Danger">SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
