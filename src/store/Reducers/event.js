import * as actionTypes from '../Actions/actionTypes/actionTypesEvents';
import { updateObject } from '../utils';
const initialState={
    events:[],
    loading:false,
}

const fetchEventsStart = ( state, action ) => {
    console.log("IT HAS STARTEDDD");
    return updateObject( state, { loading: true } );
};

const fetchEventsSuccess = ( state, action ) => {
    console.log('ACTIONNN',action.events);
    return updateObject( state, {
        events:action.events,
        loading: false
    } );
   
};

const fetchEventsFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer =(state = initialState, action )=>{
    switch(action.type){
        case actionTypes.FETCH_EVENTS_START: return fetchEventsStart( state, action );
        case actionTypes.FETCH_EVENTS_SUCCESS: return fetchEventsSuccess( state, action );
        case actionTypes.FETCH_EVENTS_FAILED: return fetchEventsFail( state, action );
        default: return state;
    }
}
export default reducer;
