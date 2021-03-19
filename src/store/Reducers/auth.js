import * as actionTypes from '../Actions/actionTypes/actionTypesSignIn';
import { updateObject } from '../utils';


const initialState ={
    token:null,
    name:null,
    role:null,
    userId: null,
    error: null,
    loading:false
};
const authStart  =(state,action) =>{
    return updateObject(state,{error:null,loading:true})
};

const authSuccess =(state,action)=>{
    return updateObject(state,{
        token:action.token,
        role:action.role,
        name:action.name,
        userId:action.userId,
        error:null,
        loading:false
    });
};


const authFail =(state,action)=>{
    //console.log('SENT DATA red',action.error)
    return updateObject(state,{
        error:action.error,
        loading: false
    });
} ;


const authLogout =(state,action)=>{
    return updateObject(state,{
        token:null,
        role:null,
        name:null,
        userId:null,
        error:null,
        loading:false
    });
};

const reducer = (state=initialState,action)=>{
    switch(action.type){
     case actionTypes.AUTH_START:return authStart(state,action)
     case actionTypes.AUTH_SUCCESS:return authSuccess(state,action) 
     case actionTypes.AUTH_FAIL:return authFail(state,action)  
     case actionTypes.AUTH_LOGOUT:return authLogout(state,action)  
    default:
        return state;
    }

}

export default reducer;