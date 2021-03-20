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


class EventDonate extends Component{
    state={
        amount:null
    }
    componentDidMount () {
    
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')

    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    onFileUpload = () => {
        const formData = new FormData(); 
        let token = localStorage.getItem('token')
        let fundId = localStorage.getItem('eventId')
        const amount = this.state.amount; 
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
                </div>
                    <div className='set'>
                        <div className='pets-breed'>
                            <label for='pets-breed'>Amount</label>
                            <input
                                    id='pets-name'
                                    className='pets-input'
                                    placeholder="In Rupees"
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
