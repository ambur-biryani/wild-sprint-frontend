import * as actions from '../../../store/Actions/Index';
import OneEvent from '../../../Components/oneEvent/oneEvent';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import classes from './withdraw.css';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../../../abis/dBank.json'
import Token from '../../../abis/Token.json'
import Web3 from 'web3';
class WithdrawPage extends Component {
    
    async componentWillMount() {
        await this.loadBlockchainData(this.props.dispatch)
      }
    
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
            
            setInterval(function(){
    
              dbank.methods.displayTotalAmt().call().then( function (result) {
              document.getElementById("id1").innerHTML= web3.utils.fromWei(result);
            });
    
              dbank.methods.displayWithdrawnAmt().call().then( function (result) {
              document.getElementById("id2").innerHTML= web3.utils.fromWei(result);
            });
    
              dbank.methods.displayRemaining().call().then( function (result) {
              document.getElementById("id3").innerHTML= web3.utils.fromWei(result);
            });
    
          }, 1000);
           
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
    
      async deposit(amount) {
        if(this.state.dbank!=='undefined'){
          try{
            await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account0})
          } catch (e) {
            console.log('Error, deposit: ', e)
          }
        }
      }
    
      async withdraw(e) {
        e.preventDefault()
        if(this.state.dbank!=='undefined'){
          try{
            await this.state.dbank.methods.withdraw().send({from: this.state.account0})
          } catch(e) {
            console.log('Error, withdraw: ', e)
          }
        }
      }
    
      constructor(props) {
        super(props)
        this.state = {
          web3: 'undefined',
          account0: '',
          account1: '',
          token: null,
          dbank: null,
          balance: 0,
          dBankAddress: null
        }
      }
    
    render(){
    //let eventsArr = this.props.events.events;
    //console.log(eventsArr.length,"THIS IS MAIN");
    let sidebar = <Sidebar role = {localStorage.getItem('role')}/>;
    let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
    
    let oneEvent;
    
    console.log("NAME ON EVENTS PAGE",this.props.oneEvent)
    let withdrawButton =(
        <button class="fund-edit-btn" name="btnAddMore" value="DONATE!"  onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
    )
    oneEvent=(
        <div class="dummy">

        <div class="emp-profile">
            <table>        
                <tr>
                    
                    <td class="fund-colm">
                        <h5 class="titlename">Withdrawal Page</h5>           
                        
                    
                        <div class="details">     
                            <table>
                                <tr>
                                    <td><label>Account Number</label></td>
                                    <td><p > {this.state.account}</p></td>
                                </tr>
                                <tr>
                                    <td><label>Account Funds</label></td>
                                    <td><p id="id1"> </p></td>
                                </tr>
                                <tr>
                                    <td><label>Withdrawn funds</label></td>
                                    <td><p id="id2"> </p></td>
                                </tr>
                                <tr>
                                    <td><label>Remaining Funds</label></td>
                                    <td><p id="id3"> </p></td>
                                </tr>
                               {withdrawButton}
                                                         
                            </table>                                 
                        </div>                  
                    </td>   
                </tr>
            </table>
        </div>
    </div>
    )
    
    
    
   
    let TokenExpRedirect = null
    if (!localStorage.getItem('token')){
        TokenExpRedirect =<Redirect to ='/'/>
    }
       
        return(
            <div>
                {navbar}
                {sidebar}                
                
                {oneEvent}
                
                {TokenExpRedirect}
                
                
            </div>

        )
    }
}





export default WithdrawPage;