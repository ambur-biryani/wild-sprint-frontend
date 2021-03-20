import * as actionTypes from './actionTypes/actionTypesBills';
import axios from 'axios';
export const fetchBillsSuccess =(events) =>{
    return {
        type: actionTypes.FETCH_BILLS_SUCCESS,
        events: events
    };
};

export const fetchBillsFail =(error) =>{
    return {
        type: actionTypes.FETCH_BILLS_FAILED,
        error:error
    };
}

export const fetchBillsStart =()=>{
    return {
        type: actionTypes.FETCH_BILLS_START
    };
}

export const fetchBills =(token)=>{
    return dispatch=>{
        dispatch(fetchBillsStart());
        console.log('GOT DATA');
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
          }
        axios.get('http://localhost:3001/bill/myBills',config)
        .then(res=>{
           console.log("NEWWW RESPONSE",res.data.billing)
            const fetchedBills = [];
                for ( let key in res.data.billing) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedBills.push( {
                        ...res.data.billing[key],
                        id: key
                    } );
                }
            dispatch(fetchBillsSuccess(fetchedBills));
            //console.log("FETCHED EVENTS",fetchedEvents);
        })
        .catch(err=>{
            dispatch(fetchBillsFail(err));
        })
    }
}