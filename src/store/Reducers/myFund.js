import * as actionTypes from '../Actions/actionTypes/actionTypesMyfunds';
import { updateObject } from '../utils';
const initialState={
    myFunds:[],
    loading:false,
}

const fetchMyfundsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, { loading: true } );
};

const fetchMyfundsSuccess = ( state, action ) => {
    console.log('ACTIONNN',action.myFunds);
    return updateObject( state, {
        myFunds:action.myFunds,
        loading: false
    } );
   
};

const fetchMyfundsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_MYFUND_START: return fetchMyfundsStart( state, action );
        case actionTypes.FETCH_MYFUND_SUCCESS: return fetchMyfundsSuccess( state, action );
        case actionTypes.FETCH_MYFUND_FAILED: return fetchMyfundsFail( state, action );
        default: return state;
    }
}
export default reducer;
