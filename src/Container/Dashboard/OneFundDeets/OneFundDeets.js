import * as actions from '../../../store/Actions/Index';
import OneEvent from '../../../Components/oneEvent/oneEvent';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class OneFundDeets extends Component {
    state={
        eventNameArr :[]
        
    }
    componentDidMount () {
        
        this.props.onFetchOneEvents();
    };
   
    redirectHandler= ()=> {
        console.log('EVENTTTT')
        //this.props.onFetchOneEvents(event);
        this.props.history.push('/Donate');
    }
    render(){
    //let eventsArr = this.props.events.events;
    //console.log(eventsArr.length,"THIS IS MAIN");
    let sidebar = <Sidebar role = {localStorage.getItem('role')}/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    
    let oneEvent;
    let name = this.props.name;
    let scfName = this.props.scientificName;
    let habitat = this.props.habitat;
    let status = this.props.status;
    let description = this.props.description;
    let image = this.props.image;
    console.log("NAME ON EVENTS PAGE",this.props.oneEvent)
    oneEvent=(
        <OneEvent 
        name = {name}
        scientificName = {scfName}
        habitat = {habitat}
        description = {description}
        status = {status}
        image = {image}
        />
    )
    
    
    let DonateButton =(
        <button class="fund-edit-btn" name="btnAddMore" value="DONATE!" href="/Donate" onClick={() => this.redirectHandler()}>DONATE</button>
    )
   
    let TokenExpRedirect = null
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
       
        return(
            <div>
                {navbar}
                {sidebar}                
                {DonateButton}
                {oneEvent}
                {TokenExpRedirect}
                
                
            </div>

        )
    }
}

const mapStatetoProps = state =>{
    console.log('main page',state.oneEvent.events.name)
    return {
         name : state.oneEvent.events.name,
         scfName : state.oneEvent.events.scfName,
         habitat :state.oneEvent.events.habitat,
         status : state.oneEvent.events.status,
         description : state.oneEvent.events.description,
         image : state.oneEvent.events.image,
    };
};
const mapSignInDispatchToProps =dispatch => {
  
    return{
        
        onFetchOneEvents:()=>dispatch(actions.fetchOneEvent())
    };
};


export default connect(mapStatetoProps,mapSignInDispatchToProps)(OneFundDeets);