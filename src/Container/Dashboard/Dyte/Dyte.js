import * as actions from '../../../store/Actions/Index';
import React, { useEffect, useRef, useState } from 'react';
import { DyteMeeting, Meeting , DyteErrors,Participant } from "dyte-client";
import { connect, useSelector , useDispatch} from 'react-redux';
import { Layout , Button} from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Component } from 'react';
import logoPng from './logo.png';
const { Header, Footer, Sider, Content } = Layout;
function DyteMeet() {
    const dispatch = useDispatch()
    const history = useHistory();
    //const [roomDeet,setRoomDeet] = useState({});
    //const [roomName,setRoomName] = useState(null);
    const [participantId, setParticipantId] = useState(null);
    let oneEvent = useSelector(state=>state.oneEvent.events)
    let roomName = useSelector(state=>state.oneEvent.events.meetingName);
    let roomId = useSelector(state=>state.oneEvent.events.meetingId)
    console.log('ONE EVENT: ',oneEvent);
    console.log('ROOM NAME:',roomName)
    const onError = (error) => {
        console.log('ERROR:',error)
        if(error = DyteErrors.MEETING_NOTFOUND){
            // take appropriate action
        }
    }
    useEffect(()=>{
        dispatch(actions.fetchOneEvent())
    },[])
    function startMeeting(){
        const url = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meeting';

        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'b164c6e6cd0562c38a5f'
        },
        body: JSON.stringify({authorization: {waitingRoom: false}, title: 'TestMeetingNew', presetName: 'newPreset'})
    };
    
    axios(url, options).then(json => {
        console.log(json)
    })
    }
    useEffect(()=>{
        const fetch = require('node-fetch');
        //let newMtgId = "98bfca4b-b2c6-456a-b13a-2c6eeb8ef6e7"
        //const url2 = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meetings/'+json.data.data.meeting.id+'/participant';
        
        if(roomId!==null && roomName !== null){
        const url2 = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meetings/'+ roomId+'/participant';
        let clientId = Math.random().toString(36).substring(7);
        const options = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'b164c6e6cd0562c38a5f'
          },
          body: JSON.stringify({clientSpecificId: clientId , presetName: 'newPreset'})
        };
        
        fetch(url2, options)
          .then(res => res.json())
          .then(json => {
            console.log(json);
   
            setParticipantId(json?.data?.authResponse?.authToken)
          })
    }},[roomId])
/*    useEffect(() => {
        const url = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meeting';

        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'b164c6e6cd0562c38a5f'
        },
        body: JSON.stringify({authorization: {waitingRoom: false}, title: 'TestMeetingNew', presetName: 'testPreser'})
    };

axios(url, options).then(json => {
        console.log(json)
      setRoomDeet(json.data.data.meeting);
      setRoomName(json.data.data.meeting.roomName)
      const fetch = require('node-fetch');
let newMtgId = "98bfca4b-b2c6-456a-b13a-2c6eeb8ef6e7"
//const url2 = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meetings/'+json.data.data.meeting.id+'/participant';


const url2 = 'https://api.cluster.dyte.in/v1/organizations/f6677306-dddd-4341-b78e-00cb88899ad6/meetings/'+ newMtgId +'/participant';
let clientId = Math.random().toString(36).substring(7);
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'b164c6e6cd0562c38a5f'
  },
  body: JSON.stringify({clientSpecificId: clientId , presetName: 'newPreset'})
};

fetch(url2, options)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    setParticipantId(json.data.authResponse.authToken)
  })
})
  .catch(err => console.error('error:' + err));
    },[])*/
    const redirectBackHandle = ()=>{
        history.push('/onefund');

    }
    const redirectDonateHandle = ()=>{
        history.push('/donate');

    }
    let DyteComponent;
    let imageUrl  = 'http://localhost:3001/'+oneEvent.image
    let rightBar = (
        <div>
            <img src = {imageUrl} style={{width: "24vw" ,marginLeft:"1.25vw",marginRight:"1.25vw",marginTop:'2vh'}}/>
            <h3 style={{fontSize:"1.5vw",color: "white", marginLeft:"1.25vw",marginRight:"1.25vw",marginTop:'3vh'}}><strong>Fund Name:</strong> {oneEvent.name}</h3>
            <h3 style={{fontSize:"1.5vw",color: "white", marginLeft:"1.25vw",marginRight:"1.25vw",marginTop:'3vh'}}><strong>Species Name:</strong> {oneEvent.scfname}</h3>
            <h3 style={{fontSize:"1.5vw",color: "white", marginLeft:"1.25vw",marginRight:"1.25vw",marginTop:'3vh'}}><strong>Habitat:</strong> {oneEvent.habitat}</h3><br/><br/><br/>
            <Button style={{borderRadius:"15px",fontSize:"1.5vw",backgroundColor:"#ff872f",borderColor:"#ff872f", paddingBottom:"10px",paddingTop:"10px",height:"6vh",width:"6.25vw",float:"left",marginLeft:"5vw"}} onClick={redirectBackHandle}type="primary">Back</Button>
            <Button style={{borderRadius:"15px",fontSize:"1.5vw",backgroundColor:"#ff872f",borderColor:"#ff872f",paddingBottom:"10px",paddingTop:"10px",height:"6vh",width:"6.25vw",float:"right",marginRight:"5vw"}}  onClick={redirectDonateHandle} type="primary">Donate</Button>
        </div>
    )
if(roomName!==null && participantId !==null){
    console.log('ROOM NAME',roomName)
    //console.log('MEETING ID: ',roomDeet.id);
    console.log('PARTICIPANT: ',participantId);
    DyteComponent= (
        <DyteMeeting
                    onInit={(meeting) =>{
                        //console.log('MEETING',meeting)
                        (meeting.on(meeting.Events.participantJoin, (participant) => {
                            console.log('MEETING',meeting)
                            console.log('PARTICIPANT',participant)
                            
                                meeting.self.disableVideo();
                                meeting.self.disableAudio();
                            
                                
                    }))

                }}
                    onError={onError}
                    clientId='f6677306-dddd-4341-b78e-00cb88899ad6'
                     uiConfig={{
                                    header:true,
                                    dimensions:{
                                        width:"73.5vw"
                          
                        
                                    },
                                    headerElements: {
                                        clock: true,
                                        title: false,
                                        logo: true,
                                        participantCount: true,
                                    },
                                    logo:logoPng
                                }}
                    meetingConfig={{
                        //roomName: roomName,
                        roomName: roomName,
                        authToken: participantId,
                        
                    }}
                   
            />
    )
}
    return (
   
      
   
      <Layout>
        <Content>{DyteComponent}</Content>
        <Sider width="26.5vw">{rightBar}</Sider>
      </Layout>

   
            

        );
}




export default (DyteMeet);