import React, {useEffect} from 'react';
import * as actions from '../../store/Actions/Index';
import classes from './Navbar.css';
import {useSelector,useDispatch} from 'react-redux';
import { Icon } from '@iconify/react';
import arrowDown from '@iconify/icons-ion/caret-down';
const Navbar =(props)=>{
let name= props.name;
const dispatch = useDispatch()
let img = useSelector(state=>state.profile.events.photo)
useEffect(()=>{
    console.log('LOL')
    
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        console.log('SENDING')
        dispatch(actions.fetchProfile(token,userId))
    
},[])
let imageUrl= 'http://localhost:3001/'+img
return (


<nav class="topbar">
<img src={require("./logo.png")}alt="logo" class="logo"></img>
<img src={imageUrl} alt="profile" class="profile-pic"></img>

<div class="dropdown">
<button class="dropbtn">{name}</button>
<div class="dropdown-content">
<a href="/logout">Logout</a>
<a href="">Change Password</a>
</div>
</div>
</nav>
)

}

export default Navbar;