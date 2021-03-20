import * as actionTypes from '../Actions/actionTypes/actionTypesEvents';
import { updateObject } from '../utils';
const initialState={
    events:[],
    loading:false,
}

const fetchOneEventsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, { loading: true } );
};

const fetchOneEventsSuccess = ( state, action ) => {
    console.log('ACTIONNN',action.events);
    return updateObject( state, {
        events:action.events,
        loading: false
    } );
   
};

const fetchOneEventsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_ONE_EVENTS_START: return fetchOneEventsStart( state, action );
        case actionTypes.FETCH_ONE_EVENTS_SUCCESS: return fetchOneEventsSuccess( state, action );
        case actionTypes.FETCH_ONE_EVENTS_FAILED: return fetchOneEventsFail( state, action );
        default: return state;
    }
}
export default reducer;
