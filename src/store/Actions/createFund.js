import * as actionTypes from './actionTypes/actionTypesMyfunds';
import axios from 'axios';
export const startMyFundSuccess =(myFunds) =>{
    return {
        type: actionTypes.NEW_MYFUND_SUCCESS,
        myFunds: myFunds
    };
};

export const startMyFundFail =(error) =>{
    return {
        type: actionTypes.NEW_MYFUND_FAILED,
        error:error
    };
}

export const startMyFundsStart =()=>{
    return {
        type: actionTypes.NEW_MYFUND_START
    };
}

export const startMyFund =(form)=>{
    return dispatch=>{
        dispatch(startMyFundsStart());
        console.log('SEND DATA',form);

        let config = {
            headers: {
              'Authorization': 'Bearer ' + form.token
            }
        }
  
           const body={
                image:form.image,
                name:form.name,
                scientificName:form.scientificName,
                habitat:form.habitat,
                description:form.description,
                status:form.status,
                
            }


         
            // dict of all elements
          
          

          console.log("THIS IS BODY",body)
          const url = 'http://localhost:3001/fundraiser/start'
          axios.post(url,body,{
            headers: {
                'Authorization': 'Bearer ' + form.token,
                'content-type': `multipart/form-data; boundary=${form._boundary}`,
            }
        })
        .then(res=>{
           console.log("NEWWW RESPONSE",res.data)
            /*const fetchedMyfunds = [];
                for ( let key in res.data.fundraiser) {
                    //console.log(res.data.fundraiser[key],key)
                    fetchedMyfunds.push( {
                        ...res.data.fundraiser[key],
                        id: key
                    } );
                }*/
           // dispatch(fetchMyFundSuccess(fetchedMyfunds));
            //console.log("FETCHED Myfunds",fetchedMyfunds);
        })
        .catch(err=>{
            //dispatch(startMyFundFail(err));
            console.log(err);
        })
    }
}