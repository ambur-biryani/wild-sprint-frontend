
import React, { useEffect, useRef, useState } from 'react';
import { DyteMeeting, Meeting , DyteErrors,Participant } from "dyte-client";
import { connect, useSelector } from 'react-redux';
import axios from 'axios';
import { Component } from 'react';
import logoPng from './logo.png';
function DyteMeet() {
    //const [roomDeet,setRoomDeet] = useState({});
    //const [roomName,setRoomName] = useState(null);
    const [participantId, setParticipantId] = useState(null);
    let roomName = useSelector(state=>state.oneEvent.events.meetingName);
    let roomId = useSelector(state=>state.oneEvent.events.meetingId)
    console.log('ROOM NAME:',roomName)
    const onError = (error) => {
        console.log('ERROR:',error)
        if(error = DyteErrors.MEETING_NOTFOUND){
            // take appropriate action
        }
    }
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
        
        if(roomId!==null){
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
            setParticipantId(json.data.authResponse.authToken)
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
    let DyteComponent;
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
                                        width: "80vw",
                                        height: "94vh"
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
        <div className="App">
            {DyteComponent}
        </div>
        );
}




export default (DyteMeet);