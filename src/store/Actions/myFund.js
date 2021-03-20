import * as actionTypes from './actionTypes/actionTypesMyfunds';
import axios from 'axios';
export const fetchMyFundSuccess =(myFunds) =>{
    return {
        type: actionTypes.FETCH_MYFUND_SUCCESS,
        myFunds: myFunds
    };
};

export const fetchMyFundFail =(error) =>{
    return {
        type: actionTypes.FETCH_MYFUND_FAILED,
        error:error
    };
}

export const fetchMyFundsStart =()=>{
    return {
        type: actionTypes.FETCH_MYFUND_START
    };
}

export const fetchMyFund =(token,userId)=>{
    return dispatch=>{
        dispatch(fetchMyFundsStart());
        console.log('GOT DATA');

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        axios.get('http://localhost:3001/fundraiser/myfunds/'+userId,config)
        .then(res=>{
           // console.log("NEWWW RESPONSE",res.data.fundraiser)
            const fetchedMyfunds = [];
                for ( let key in res.data.fundraiser) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedMyfunds.push( {
                        ...res.data.fundraiser[key],
                        id: key
                    } );
                }
            dispatch(fetchMyFundSuccess(fetchedMyfunds));
            console.log("FETCHED Myfunds",fetchedMyfunds);
        })
        .catch(err=>{
            dispatch(fetchMyFundFail(err));
        })
    }
}
