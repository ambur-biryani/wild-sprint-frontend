import * as actions from '../../../store/Actions/Index';
import OneEvent from '../../../Components/oneEvent/oneEvent';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../../../abis/dBank.json'
import Token from '../../../abis/Token.json'
import Web3 from 'web3';
import axios from 'axios';

class OneFundDeets extends Component {
    state={
        eventNameArr :[],
        meetingName: null,
        meetingId: null,        
    }
    
    async componentDidMount () {
        await this.loadBlockchainData(this.props.dispatch)
        await this.props.onFetchOneEvents();
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')

    };
    async loadBlockchainData(dispatch) {
        if(typeof window.ethereum!=='undefined'){
          const web3 = new Web3(window.ethereum)
          const netId = await web3.eth.net.getId()
    
          await window.ethereum.enable();
    
          const accounts = await web3.eth.getAccounts()
    
          //load balance
          
          if(typeof accounts[0] !=='undefined' ){
            const balance = await web3.eth.getBalance(accounts[0]) 
          
            const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address);
            
          
                
                dbank.methods.displayTotalAmt().call().then( function (result) {
                document.getElementById("id1").innerHTML= web3.utils.fromWei(result);
              });
      
                dbank.methods.displayWithdrawnAmt().call().then( function (result) {
                document.getElementById("id2").innerHTML= web3.utils.fromWei(result);
              });
      
                dbank.methods.displayRemaining().call().then( function (result) {
                document.getElementById("id3").innerHTML= web3.utils.fromWei(result);
              });
      
            
           
            this.setState({account0: accounts[0],account1: accounts[1], balance: balance, web3: web3})
          } else {
            window.alert('Please login with MetaMask')
          }
    
          //load contracts
          try {
            const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
            const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
            const dBankAddress = dBank.networks[netId].address
            this.setState({token: token, dbank: dbank, dBankAddress: dBankAddress})
          } catch (e) {
            console.log('Error', e)
            window.alert('Contracts not deployed to the current network')
          }
    
        } else {
          window.alert('Please install MetaMask')
        }
      }
    redirectHandler= ()=> {
        console.log('EVENTTTT')
        //this.props.onFetchOneEvents(event);
        this.props.history.push('/Donate');
    }

    redirectViewHandler= ()=> {
        console.log('EVENTTTT')
        //this.props.onFetchOneEvents(event);
        this.props.history.push('/Dyte');
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
    let image = 'http://localhost:3001/'+this.props.image;
    console.log("NAME ON EVENTS PAGE",this.props.oneEvent)
    oneEvent=(
        <div class="dummy">

        <div class="emp-profile">
            <table>        
                <tr>
                    <td class="colm">
                        <img src={image} alt="" class="fund-profilepic"/>
                    </td> 
                    <td class="fund-colm">
                        <h5 class="titlename">Fundraiser Details</h5>           
                        
                    
                        <div class="details">     
                            <table>
                                <tr>
                                    <td><label>Event Name</label></td>
                                    <td><p>{name}</p></td>
                                </tr>
                                <tr>
                                    <td><label>Scientifc Name</label></td>
                                    <td><p>{scfName}</p></td>
                                </tr>
                                <tr>
                                    <td><label>Location</label></td>
                                    <td><p>{habitat}</p></td>
                                </tr>
                                <tr>
                                    <td><label>Status</label></td>
                                    <td><p>{status}</p></td>
                                </tr>
                                <tr>
                                    <td><label>About</label></td>
                                    <td><p>{description}</p></td>
                                </tr> 
                                <tr>
                                    <td><label>Total Funds</label></td>
                                    <td><p id='id1'> </p></td>
                                </tr> 
                                <tr>
                                    <td><label>Funds Spent</label></td>
                                    <td><p id='id2'> </p></td>
                                </tr> 
                                <tr>
                                    <td><label>Funds Remaining</label></td>
                                    <td><p id='id3'> </p></td>
                                </tr>                          
                            </table>                                 
                        </div>                  
                    </td>   
                </tr>
            </table>
        </div>
    </div>
        
    )
    
    /*<OneEvent 
        name = {name}
        scientificName = {scfName}
        habitat = {habitat}
        description = {description}
        status = {status}
        image = {image}
        />*/
    let DonateButton =(
        <button class="fund-edit-btn" name="btnAddMore" value="DONATE!" href="/Donate" onClick={() => this.redirectHandler()}>DONATE</button>
    )

    let viewButton =(
        <button class="fund-edit-btn" name="btnAddMore" value="DONATE!" href="/dyte" onClick={() => this.redirectViewHandler()}>VIEW</button>
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
                {viewButton}
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