import React from 'react';
import classes from './Navbar.css';
import { Icon } from '@iconify/react';
import arrowDown from '@iconify/icons-ion/caret-down';
const navbar =(props)=>{
let name= props.name;

return (


<nav class="topbar">
<img src={require("./logo.png")}alt="logo" class="logo"></img>
<img src={require("./tanya 3.jpg")} alt="profile" class="profile-pic"></img>

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

export default navbar;