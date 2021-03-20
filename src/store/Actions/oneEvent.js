import * as actionTypes from './actionTypes/actionTypesEvents';
import axios from 'axios';
export const fetchOneEventsSuccess =(events) =>{
    return {
        type: actionTypes.FETCH_ONE_EVENTS_SUCCESS,
        events: events
    };
};

export const fetchOneEventsFail =(error) =>{
    return {
        type: actionTypes.FETCH_ONE_EVENTS_FAILED,
        error:error
    };
}

export const fetchOneEventsStart =()=>{
    return {
        type: actionTypes.FETCH_ONE_EVENTS_START
    };
}

export const fetchOneEvent =()=>{
    let fundId = localStorage.getItem('eventId');
    let token= localStorage.getItem('token');
    return dispatch=>{
        dispatch(fetchOneEventsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
          }
        axios.get('http://localhost:3001/fundraiser/get/'+fundId,config)
        .then(res=>{
           console.log("NEWWW RESPONSE",res.data.fundraiser)
           dispatch(fetchOneEventsSuccess(res.data.fundraiser));
        })
        .catch(err=>{
            console.log(err)
           dispatch(fetchOneEventsFail(err));
        })
    }

    
}