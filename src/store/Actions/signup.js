import * as actionTypes from './actionTypes/actionTypesSignUp';
import axios from 'axios';

export const SignUpstart =() =>{
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const SignUpSuccess =(name,role,password,email) =>{
    return {
        type:actionTypes.SIGNUP_SUCCESS,
        name:name,
        role:role,
        email:email,
        password:password
    };
};

export const SignUpFail = (error) =>{
    console.log('SENT DATA function',error)
    return{
        type: actionTypes.SIGNUP_FAIL,
        error: error
    }
   
};


export const SignUp =(email,name,password)=>{
    return dispatch=>{
    dispatch(SignUpstart());
    const SignUpData ={
        email:email,
        name:name,
        password:password,
        role:'organiser'
    }
    console.log('SignUpData');
    console.log('SENT SIGNUP');
    let url = 'http://localhost:3001/auth/SignUp'
    axios.post(url,SignUpData)
    .then(response=>{
        console.log('Reg Success');
        dispatch(SignUpSuccess())
    })
    .catch(err=>{
        console.log(err.response.data);
        dispatch(SignUpFail(err.response.data))
        console.log('SENT DATA next')
    });
    };
};