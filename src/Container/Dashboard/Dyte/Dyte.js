
import React, { useEffect, useRef, useState } from 'react';
import { DyteMeeting, Meeting , DyteErrors,Participant } from "dyte-client";

import axios from 'axios';
import { Component } from 'react';

export default function DyteMeet() {
    const [roomDeet,setRoomDeet] = useState({});
    const [roomName,setRoomName] = useState(null);
    const [participantId, setParticipantId] = useState(null);
    const onError = (error) => {
        console.log('ERROR:',error)
        if(error = DyteErrors.MEETING_NOTFOUND){
            // take appropriate action
        }
    }

    useEffect(() => {
        const url = 'https://api.cluster.dyte.in/v1/organizations/959e35cc-d5bd-4fcd-9fc2-c0d3690d5f97/meeting';

        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: '069fe49b1f4c0d45b4b4'
        },
        body: JSON.stringify({authorization: {waitingRoom: false}, title: 'TestMeetingNew', presetName: 'testPreser'})
    };

axios(url, options)
  
  .then(json => {
      console.log(json)
      setRoomDeet(json.data.data.meeting);
      setRoomName(json.data.data.meeting.roomName)
      const fetch = require('node-fetch');
let newMtgId = "7a35b13c-4230-4178-a878-3946355ddc8b"
//const url2 = 'https://api.cluster.dyte.in/v1/organizations/959e35cc-d5bd-4fcd-9fc2-c0d3690d5f97/meetings/'+json.data.data.meeting.id+'/participant';
const url2 = 'https://api.cluster.dyte.in/v1/organizations/959e35cc-d5bd-4fcd-9fc2-c0d3690d5f97/meetings/'+newMtgId+'/participant';
let clientId = Math.random().toString(36).substring(7);
console.log('CLIENT ID',clientId);
const options = {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: '069fe49b1f4c0d45b4b4'
  },
  body: JSON.stringify({clientSpecificId: clientId, presetName: 'ViewerPreset'})
};

fetch(url2, options)
  .then(res => res.json())
  .then(json => {
      console.log(json);
      setParticipantId(json.data.authResponse.authToken)
    })
  .catch(err => console.error('error:' + err));
    })
  .catch(err => console.error('error:' + err));
    },[])
    let DyteComponent;
if(roomName!==null && participantId !==null){
    console.log('ROOM NAME',roomName)
    console.log('MEETING ID: ',roomDeet.id);
    console.log('PARTICIPANT: ',participantId);
    DyteComponent= (
        <DyteMeeting
                    onInit={(meeting) =>{
                        //console.log('MEETING',meeting)
                        (meeting.on(meeting.Events.participantJoin, (participant) => {
                            console.log('MEETING',meeting)
                            console.log('PARTICIPANT',participant)
                            if(participant.name!=='TestUSer'){
                                meeting.self.disableVideo();
                                meeting.self.disableAudio();
                            }
                            
                            /*meeting.participants.find(o=>o.id===participant.id).then(res=>{
                                participant.disableAudio();
                                participant.disableVideo();
                            })*/
                            //let index = meeting.participants.findIndex(participant)
                            //console.log("INDEX",index);
                            //participant.disableAudio();
                            //participant.disableVideo()
                           /*let participantList = [...meeting.participants];
                            console.log('LENGTH',participantList,participantList.length)
                            let partLen = participantList.length
                            let i;
                            for(i =0;i< partLen;i++){
                                console.log('ite',i)
                                if(meeting.participants[i].name!== 'TestUSer'){
                                    //console.log('ite',i)
                                    //console.log('participants NAme',meeting.participants[i].name)
                                    //meeting.participants[i].disableAudio();
                                    //meeting.participants[i].disableVideo();
                                    meeting.self.disableVideo();
                                    meeting.self.disableAudio();
                                }else{
                                    console.log('pinning: ')
                                    //meeting.participants[i].pin()
                                }
                            }*/
                            
                            //meeting.participants[1].isPinned();
                            //meeting.participants[1].videoEnabled=false;
                            
                    }))

                }}
                    onError={onError}
                    clientId='959e35cc-d5bd-4fcd-9fc2-c0d3690d5f97'
                     uiConfig={{
                                    header:false
                                }}
                    meetingConfig={{
                        //roomName: roomName,
                        roomName: "robust-celery",
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