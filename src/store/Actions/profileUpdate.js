import * as actionTypes from './actionTypes/actionTypesProfile';
import axios from 'axios';
export const profileUpdateStart = () => {
    return {
        type: actionTypes.PROF_UPDATE_START
    };
};

export const profileUpdateSuccess = (events) => {
    return {
        type: actionTypes.PROF_UPDATE_SUCCESS,
        events: events
    };
};

export const profileUpdateFail =(events) =>{
    return {
        type: actionTypes.PROF_UPDATE_FAILED,
        events: events
    };
};



export const profileUpdate = (phone,lastname,token,userId) => {
    return dispatch => {
        console.log("TOKEN",token);
        console.log("USERID",userId);
        dispatch(profileUpdateStart ());
        const profileUpdateData ={
            phone:phone,
            lastname:lastname,
            image: '/images/rhino.jpg'
        }
        console.log('SENT');
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
          let url= ('http://localhost:3001/user/update/'+userId)
        axios.patch(url,config,profileUpdateData)
        
        .then(response=>{
            console.log('HEHE,update happened',response);
            //dispatch( profileUpdateSuccess())
        })
        .catch(err=>{
            console.log(err.response.data);
            //dispatch(authFail(err.response.data))
        })
    };
};