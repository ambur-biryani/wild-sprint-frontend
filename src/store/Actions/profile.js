import * as actionTypes from './actionTypes/actionTypesProfile';
import axios from 'axios';

export const fetchProfileSuccess =(events) =>{
    return {
        type: actionTypes.PROF_GET_SUCCESS,
        events: events
    };
};
export const fetchProfileFail =(events) =>{
    return {
        type: actionTypes.PROF_GET_FAILED,
        events: events
    };
};
export const fetchProfileStart=(events) =>{
    return {
        type: actionTypes.PROF_GET_START,
        events: events
    };
};


export const fetchProfile =(token,userId)=>{
    return dispatch=>{
        dispatch(fetchProfileStart());
        console.log('GOT DATA');
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        axios.get('http://localhost:3001/user/get/'+userId,config)
        .then(res=>{
           console.log("NEWWW RESPONSE",res.data)
           
            const fetchedProfiles = [];
            
            console.log("HEHE,your name",res.data.user.name);
            fetchedProfiles.push( {
                        fname:res.data.user.name,
                        lastname:res.data.user.lastname,
                        phone: res.data.user.phone,
                        fundraisers:res.data.user.fundraisers,
                        bills:res.data.user.bills,
                        email:res.data.user.email,
                        photo:res.data.user.pPicture,


                    } );
               
            dispatch(fetchProfileSuccess(fetchedProfiles));
            //console.log("FETCHED EVENTS",fetchedProfiles);
        })
        .catch(err=>{
            console.log(err);
            //dispatch(fetchEventsFail(err));
        })
    }
}