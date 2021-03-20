
import React, { useEffect, useRef, useState } from 'react';
import { DyteMeeting, Meeting , DyteErrors } from "dyte-client";

import axios from 'axios';

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

const url2 = 'https://api.cluster.dyte.in/v1/organizations/959e35cc-d5bd-4fcd-9fc2-c0d3690d5f97/meetings/'+json.data.data.meeting.id+'/participant';
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
                    onInit={(meeting) => Meeting}
                    onError={onError}
                    clientId='959e35cc-d5bd-4fcd-9fc2-c0d3690d5f97'
                     uiConfig={{
                                    header:false
                                }}
                    meetingConfig={{
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