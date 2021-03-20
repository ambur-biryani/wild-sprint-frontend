import * as actions from '../../../store/Actions/Index';
import axios from 'axios';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/Input';
import classes from '../StartFundraiser/StartFundraiser.css'
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data';

import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../../../abis/dBank.json'
import Token from '../../../abis/Token.json'
import Web3 from 'web3';

class EventDonate extends Component{
    state={
        amount:null
    }
    async componentDidMount () {
        await this.loadBlockchainData(this.props.dispatch)
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')

    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    async loadBlockchainData(dispatch) {
        if(typeof window.ethereum!=='undefined'){
          const web3 = new Web3(window.ethereum)
          const netId = await web3.eth.net.getId()
          await window.ethereum.enable()
          const accounts = await web3.eth.getAccounts()
    
          //load balance
          if(typeof accounts[0] !=='undefined'){
            const balance = await web3.eth.getBalance(accounts[0])        
            const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address);
            setInterval(function(){
              dbank.methods.displayAmt().call().then( function (result) {
              //setInterval(function(){ window.location.reload(); }, 10000);
              //document.getElementById("id").innerHTML= web3.utils.fromWei(result);
            })}, 1000);
           
            this.setState({account: accounts[0], balance: balance, web3: web3})
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
            await this.state.dbank.methods.deposit().send({value: amount.toString(), from: this.state.account})
          } catch (e) {
            console.log('Error, deposit: ', e)
          }
        }
      }
    
    onFileUpload = () => {
        const formData = new FormData(); 
        let token = localStorage.getItem('token')
        let fundId = localStorage.getItem('eventId')
        const amount = this.state.amount; 
        let tmpamount = amount * 10**18 
        this.deposit(tmpamount)
        formData.append("amount",amount);
        console.log(amount)
        if (parseInt(amount)>=0){
        const url = 'http://localhost:3001/bill/'+fundId
        axios.post(url,formData,{
          headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
          }
      }).then(
            this.props.history.push('/oneFund')
        )
    }else{
        let error
        error=(
            <p>PLEASE ENTER AN AMOUNT GREATER THAN 0</p>
        )
    }
     }
     constructor(props) {
        super(props)
        this.state = {
          web3: 'undefined',
          account: '',
          token: null,
          dbank: null,
          balance: 0,
          dBankAddress: null
        }
      }

    render(){
        let fundId = localStorage.getItem('eventId')
        let DonateForm;
        DonateForm=(
    <div className="body">
        <div className='signup-container'>
            <div className='left-container'>
              <h1>
                WILDSPRINT
              </h1>
              <div>
                <img src={require("./logo.png")}alt="logo" className="logo"/>
              </div>
            </div>
            <div className='right-container'>
                <div className="header">
                    <h1> Step up towards saving the future!</h1><br/>
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Fundraiser Name</label>
                            <p><strong>Their horns, their lives</strong></p>
                        </div>
                    </div>
                    
                        
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Fundraiser ID</label>
                            <p><strong>{fundId }</strong></p>
                        </div>
                    </div>
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Account ID</label>
                            <p><strong>{this.state.account}</strong></p>
                        </div>
                    </div>
                </div>
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Amount</label>
                            <input
                                    id='pets-name'
                                    className='pets-input'
                                    placeholder="Amount"
                                    step="0.01"
                                    type='text'
                                    name='amount'
                                    value={this.state.amount}
                                    onChange={event => this.handleChange(event)}/>
                        </div>
                        {this.error}
                    </div>

                    <div className="footer">
                        <div className='set'>
                        <button className='back'>Back</button>
                        <button className='next' onClick={this.onFileUpload}>DONATE</button>
                        
                        </div>
                    </div>
            
            </div>    
            
        </div>
    </div>
    
    )
        return(
            <div>
            {DonateForm}
            </div>
        )
    }
}


export default EventDonate;
