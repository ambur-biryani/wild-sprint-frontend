import * as actionTypes from '../Actions/actionTypes/actionTypesBills';
import { updateObject } from '../utils';
const initialState={
    Bills:[],
    loading:true,
}

const fetchBillsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, { loading: true } );
};

const fetchBillsSuccess = ( state, action ) => {
    console.log('ACTIONNN',action.events);
    return updateObject( state, {
        events:action.events,
        loading: false
    } );
   
};

const fetchBillsFail = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_BILLS_START: return fetchBillsStart( state, action );
        case actionTypes.FETCH_BILLS_SUCCESS: return fetchBillsSuccess( state, action );
        case actionTypes.FETCH_BILLS_FAILED: return fetchBillsFail( state, action );
        default: return state;
    }
}
export default reducer;
