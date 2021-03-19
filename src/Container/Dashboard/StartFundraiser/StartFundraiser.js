import * as actions from '../../../store/Actions/Index';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/Input';
import Profile from '../../../Components/Profile/Profile';
import EditProfile from '../../../Components/Profile/editProfile';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import cameraRetro from '@iconify/icons-ion/camera';
import { connect } from 'react-redux';
import classes from './StartFundraiser.css'
import FormData from 'form-data'; 
import axios from 'axios';

class startFundraiser extends Component{

    state={
        name:null,
        scientificName:null,
        habitat:null,
        description:null,
        status:'EX',
        selectedFile: null      
}
 onFileChange = (event)=> { 
  
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
        
        }; 

componentDidMount () {
    
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    
};
handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
}

onFileUpload = () => { 
  

    const formData = new FormData(); 
    let token = localStorage.getItem('token')
 
    const name = this.state.name; 
    const scientificName = this.state.scientificName; 
    const habitat = this.state.habitat; 
    const description = this.state.description; 
    const status = this.state.status; 

    const form =JSON.stringify({ 
        name: name,
        scientificName : scientificName,
        habitat:habitat,
        description:description,
       status:status,
    })
        console.log(form);

    formData.append("name",name);
    formData.append("scientificName",scientificName);
    formData.append("habitat",habitat);
    formData.append("description",description);
    formData.append("status",status);
    formData.append( 
        "image", 
        this.state.selectedFile, 
        this.state.selectedFile.name 
      ); 
   
      console.log("HUEHUEHUEE",formData);
      const url = 'http://localhost:3001/fundraiser/start'
      axios.post(url,formData,{
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
}; 

    render(){
       const Goback =(
           <Redirect to='/fund'/>
       )

        return(
            <div className ="body">
            <div className='signup-container'>
            <div className='left-container'>
              <h1>WILDSPRINT</h1>
              <div>
              <img src={require("./logo.png")}alt="logo" class="logo2"></img>
              </div>
            </div>
      
            <div className='right-container'>
              <header>
      
                <h1> Take action towards saving the future!</h1><br/>
      
                <div className='set'>
                  <div className='pets-name'>
                    <label for='pets-name'>Fundraiser Name</label>
                    <input
                        id='pets-name'
                        className='pets-input'
                        placeholder="Fundraiser Name"
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>

                <div className="eventphoto">
                  <input  id="upload" ref="upload"  name="image" type="file" accept="image/*"
                        onChange={this.onFileChange}/>
                  
                </div>
   
                
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Scientific Name</label>
                    <input
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Scientific Name"
                        type='text'
                        name='scientificName'
                        value={this.state.scientificName}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>
      
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Habitat</label>
                    <input
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Habitat"
                        type='text'
                        name='habitat'
                        value={this.state.habitat}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>
      
                <div className='set'>
                  <div className='pets-breed'>
                    <label for='pets-breed'>Description</label>
                    <textarea
                        id='pets-breed'
                        className='pets-input'
                        placeholder="Description"
                        type='text'
                        rows="4" cols="50"
                        name='description'
                        value={this.state.description}
                        onChange={event => this.handleChange(event)}
                    />
                  </div>
                </div>
                
                <div className='pets-weight'>
                  <label for='pet-weight-0-25'>Status</label>
                  <div name = 'status' className='radio-container'  onChange={event => this.handleChange(event)}>
      
                    <input name='status'  id='ex' name='pet-weight' type='radio' value='ex'/>
                    <label for='ex'>EX</label>
      
                    <input name='status'  id='ew' name='pet-weight' type='radio' value='ew'/>
                    <label for='ew'>EW</label>
      
                    <input name='status'    id='cr' name='pet-weight' type='radio' value='cr'/>
                    <label for='cr'>CR</label>
      
                    <input name='status'   id='en' name='pet-weight' type='radio' value='en'/>
                    <label for='en'>EN</label>
      
                    <input name='status'    id='vu' name='pet-weight' type='radio' value='vu'/>
                    <label for='vu'>VU</label>
      
                    <input name='status'   id='nt' name='pet-weight' type='radio' value='nt'/>
                    <label for='nt'>NT</label>
      
                    <input name='status'   id='lc' name='pet-weight' type='radio' value='lc'/>
                    <label for='lc'>LC</label>
      
                    <input name='status'    id='dd' name='pet-weight' type='radio' value='dd'/>
                    <label for='dd'>DD</label>
      
                    <input name='status'   id='ne' name='pet-weight' type='radio' value='ne'/>
                    <label for='ne'>NE</label>
                    
                  </div>
                </div>
              </header>
      
              <div className= "footer">
                <div className='set'>
                  <button className='back' href="/fund" >Back</button>
                  <button className='next' onClick={this.onFileUpload} >Next</button>
                </div>
              </div>
      
            </div>
          </div> 
          </div>     
        )
    }
   

}
const mapSignInDispatchToProps =dispatch => {
  
    return{
        onCreateFundraiser:(form) =>dispatch(actions.startMyFund(form))
    };
};

export default connect(null, mapSignInDispatchToProps)(startFundraiser);