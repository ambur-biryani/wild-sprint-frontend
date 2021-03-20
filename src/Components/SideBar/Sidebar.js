import React from 'react';
import classes from './SideBar.css';




    const AdminSidebar =()=>{

        return (
            <div class="sidebar">
        <nav class="sidenav">
        <ul class="sidebar-list" >
            <li><a href="/profile">PROFILE</a></li><br/><br/>
            <li><a href="/events">EVENTS</a></li><br/><br/>
            <li><a href="/MyBills">BILLS</a></li><br/><br/>
            <li><a href="/gallery">GALLERY</a></li>
        </ul>
        </nav>
    </div> 
        );
    } ;

    const OrganiserSidebar =()=>{
        return (
            <div class="sidebar">
        <nav class="sidenav">
        <ul class="sidebar-list" >
            <li><a href="/profile">PROFILE</a></li><br/><br/>
            <li><a href="/fund">FUNDRAISER</a></li><br/><br/>
            <li><a href="/MyBills">BILLS</a></li><br/><br/>
            <li><a href="/events">EVENTS</a></li><br/><br/>
            <li><a href="/gallery">GALLERY</a></li>
        </ul>
        </nav>
    </div> 
        );
    };
    const UserSidebar =()=>{
        return (
            <div class="sidebar">
        <nav class="sidenav">
        <ul class="sidebar-list" >
            <li><a href="/profile">PROFILE</a></li><br/><br/>
            <li><a href="/events">EVENTS</a></li><br/><br/>
            <li><a href="/MyBills">BILLS</a></li><br/><br/>
            <li><a href="/gallery">GALLERY</a></li>
        </ul>
        </nav>
    </div> 
        );
    }
const sidebar =(props)=>{  
   let role = props.role
    switch(role){
        case 'admin':return AdminSidebar()
        case 'organiser':return OrganiserSidebar() 
        case 'user':return UserSidebar()   
        }   
    
}

export default sidebar;