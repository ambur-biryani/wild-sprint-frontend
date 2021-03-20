import * as actions from '../../../store/Actions/Index';
import Event from '../../../Components/Events/Event';
import MyFund from '../../../Components/MyFunds/MyFunds';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './fundraiser.css';
import FormData from 'form-data'; 

class Myfunds extends Component {
    state={
        eventNameArr :[]
        
    }
    componentDidMount () {
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId');
        this.props.fetchMyFund(token,userId);
    };

    render(){
    //let eventsArr = this.props.events.events;
    //console.log(eventsArr.length,"THIS IS MAIN");
    let sidebar = <Sidebar role = {localStorage.getItem('role')}/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    console.log("THIS PAGE NOEEE",this.props.myFunds)
    let events = <Spinner/>;
    if ( !this.props.loading ) {
        let myFundsArr= this.props.myFunds;
        for (let i=0;i<myFundsArr.length;i++){
            //console.log(i);
            this.state.eventNameArr.push({
                
                description: myFundsArr[i].description,
                habitat: myFundsArr[i].habitat,
                name: myFundsArr[i].name,
                scfname: myFundsArr[i].scfname,
                name: myFundsArr[i].name,
                image: myFundsArr[i].image
            });
         console.log('EVENT NAME',this.state.eventNameArr) 
        }
    
    events = this.state.eventNameArr.map( event => (
     //console.log("NOOB",event.name),
        <MyFund
         name={event.name}
         image={event.image}
           />
        ))
    }
    let TokenExpRedirect = null;
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }

    let buttonStartFundraiser =(
        <button className="button2">
            <a href="/StartFundForm">START FUNDRAISER!</a>
        </button>
    )
       
        return(
            <div className="myfunds">
                {navbar}
                {sidebar}
                
                <div class="fund-pics row">
                
                <h2 className="yourFund">YOUR FUNDRAISERS</h2>
                {buttonStartFundraiser}<br/><br/><br/><br/>
                <div>{events}</div>
                {TokenExpRedirect}
                </div>
                
            </div>

        )
    }
}


const mapSignInDispatchToProps =dispatch => {
  
    return{
        fetchMyFund:(token,userId) =>dispatch(actions.fetchMyFund(token,userId))
    };
};
const mapStatetoProps = state =>{
    console.log('main page',state.myFund.myFunds
    )
    return {
        events:state.events,
        loading:state.events.loading,
        token:state.auth.token,
        myFunds: state.myFund.myFunds,
    };
};


export default connect(mapStatetoProps, mapSignInDispatchToProps)(Myfunds);