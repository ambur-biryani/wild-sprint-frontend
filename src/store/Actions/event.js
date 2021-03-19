import * as actionTypes from './actionTypes/actionTypesEvents';
import axios from 'axios';
export const fetchEventsSuccess =(events) =>{
    return {
        type: actionTypes.FETCH_EVENTS_SUCCESS,
        events: events
    };
};

export const fetchEventsFail =(error) =>{
    return {
        type: actionTypes.FETCH_EVENTS_FAILED,
        error:error
    };
}

export const fetchEventsStart =()=>{
    return {
        type: actionTypes.FETCH_EVENTS_START
    };
}

export const fetchEvents =(token)=>{
    return dispatch=>{
        dispatch(fetchEventsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
          }
        axios.get('http://localhost:3001/fundraiser/',config)
        .then(res=>{
           // console.log("NEWWW RESPONSE",res.data.fundraiser)
            const fetchedEvents = [];
                for ( let key in res.data.fundraiser) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedEvents.push( {
                        ...res.data.fundraiser[key],
                        id: key
                    } );
                }
            dispatch(fetchEventsSuccess(fetchedEvents));
            //console.log("FETCHED EVENTS",fetchedEvents);
        })
        .catch(err=>{
            dispatch(fetchEventsFail(err));
        })
    }
}