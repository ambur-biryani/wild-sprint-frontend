import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import classes from './Auth.css';
import {Redirect} from 'react-router-dom';
import { Icon } from '@iconify/react';
import lockCombination from '@iconify/icons-ion/lock-combination';
import * as actions from '../../store/Actions/Index';

class Auth extends Component {
    //Setting States
    state = {
        //Configure input fields for sign-in form
        controls_signIn: {
            email: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            
            }
        },

        //Configure input fields for sign-up form
        controls_signUp: {
            email: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            name:{
                elementType:'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            
            },
            Confpassword: {
                elementType: 'input',
                elementConfig: {
                    className:'formcontrol',
                    type: 'password',
                    placeholder: 'Password(repeat)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            
            }
        },
        isSignIn:true,
   
    }
    //Validates all inputs
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    //Checks if an input has been entered in the text box
    inputChangedHandler = (event, controlName) => {
        
        if(this.state.isSignIn){
            const updatedControls = {
                ...this.state.controls_signIn,
                [controlName]: {
                    ...this.state.controls_signIn[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.controls_signIn[controlName].validation),
                    touched: true
                }
            };
        this.setState({controls_signIn: updatedControls});
        }else{
            const updatedControls = {
                ...this.state.controls_signUp,
                [controlName]: {
                    ...this.state.controls_signUp[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.controls_signUp[controlName].validation),
                    touched: true
                }
            };
            this.setState({controls_signUp: updatedControls});

        }
    }
    //saves the input in the state and passes it on as props
    submitHandler = (event) => {
        if(this.state.isSignIn){
            event.preventDefault();
            this.props.onAuth(this.state.controls_signIn.email.value, this.state.controls_signIn.password.value);
        }
        else{
            event.preventDefault();
            this.props.onSignUp(this.state.controls_signUp.email.value, this.state.controls_signUp.name.value, this.state.controls_signUp.password.value);
        }
    }

    //switch between sigin and signup(To add forgot password)
    switchAuthHandler =()=>{
        this.setState(prevState=>{
                return {isSignIn: !prevState.isSignIn}
        })
    };
   


    render () {
        
        const formElementsArray = []; //array for input elements
        if(this.state.isSignIn){
        for ( let key in this.state.controls_signIn ) {  // render input elements from array
            formElementsArray.push( {
                id: key,
                config: this.state.controls_signIn[key]
            });
        }
        }else{

            for ( let key in this.state.controls_signUp ) {
                formElementsArray.push( {
                    id: key,
                    config: this.state.controls_signUp[key]
                } );
            }
        }
        let authRedirect = null;
        if (this.props.isAuthenticated){
            authRedirect =<Redirect to ='/events'/>
        }
        //mapping configurations of input elements 
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                className={formElement.config.className}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        //configuring loading...
        let spinner = null;
        if(this.state.isSignIn){
                if(this.props.loading_auth){
                spinner=<Spinner />
            }
        }else{
            if(this.props.loading_signup){
                spinner=<Spinner />
            }
        }

        //configuring success message for signup state onlue
        let successMessage;
        if(!this.state.isSignIn){
            if(this.props.success_signup){
                successMessage=(
                <p className="SignUp-success">{this.props.success_signup}</p>
            )
        }
    }

        //configuring error message based on if sigin or signup is the state
        let errorMessage = null;
        if(this.state.isSignIn){
            if(this.props.error_auth){
             console.log("in main page",this.props.error_auth)
                errorMessage=(
                <p className="SignIn-error">{this.props.error_auth.message}</p>
                );
         }
        }else{
            if(this.props.error_signup){
                console.log("in main page",this.props.error_signup)
                   errorMessage=(
                   <p className="SignIn-error">{this.props.error_signup.message}</p>
                   );
         }
        }


        //configuring submit button based on if sigin or signup is the state
       let button=  (
            <button className='SignIn-button'>{this.state.isSignIn ? 'Log In': 'Sign Up'}</button>
        );
        
        //returning HTML jsx 
        return (
            <div className="logindark">
                <form className="signin-form" onSubmit={this.submitHandler}>
                <div className="illustration">
                     <Icon className="illustration-lock" icon={lockCombination} />
                 </div>
                    {form}
                    {button}
                    {spinner}
                    {successMessage}
                    {errorMessage}
                    <a className="forgot" >Forgot your password?</a>
                     <button 
                     onClick={this.switchAuthHandler}
                     className="forgot-btn ">{this.state.isSignIn ? 'New user?Click here to sign up': 'Already have an account? Click Here'}</button>
                </form>
                {authRedirect}
            </div>
        );
        
        }

    
}
    

//To access the props sent 
const mapSignInDispatchToProps =dispatch => {
  
    return{
        
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSignUp:(email,name,password,confpassword)=>dispatch(actions.SignUp(email,name,password,confpassword))
    };
}


//to access the errors and loading state 
const mapStatetoProps = state =>{
    console.log('main page',state)
    return {
        loading_auth: state.auth.loading,
        error_auth:  state.auth.error,
        loading_signup: state.signup.loading,
        error_signup:state.signup.error, 
        success_signup: state.signup.success,
        isAuthenticated: state.auth.token !==null
    };
};


export default connect(mapStatetoProps, mapSignInDispatchToProps)(Auth);

