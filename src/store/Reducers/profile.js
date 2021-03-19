import * as actionTypes from '../Actions/actionTypes/actionTypesProfile';
import { updateObject } from '../utils';
const initialState={
    events:[],
    loading:false,
}

const fetchProfileStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, { loading: true } );
};

const fetchProfileSuccess = ( state, action ) => {
    console.log('ACTIONNN',action.events[0]);
    return updateObject( state, {
        events:action.events[0],
        loading: false
    } );
   
};

const fetchProfileFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.PROF_GET_START: return fetchProfileStart( state, action );
        case actionTypes.PROF_GET_SUCCESS: return fetchProfileSuccess( state, action );
        case actionTypes.PROF_GET_FAILED: return fetchProfileFail( state, action );
        default: return state;
    }
}
export default reducer;
