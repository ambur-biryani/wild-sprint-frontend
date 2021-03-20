import * as actions from '../../../store/Actions/Index';
import axios from 'axios';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Input from '../../../Components/UI/Input/Input';
import Profile from '../../../Components/Profile/Profile';
import EditProfile from '../../../Components/Profile/editProfile';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormData from 'form-data';

class ProfileDisp extends Component{
    
    state={
            isEditing:false,
            lastname:null,
            phone:null,
            selectedFile: null
            
    }

    onFileChange = (event)=> { 
  
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
        
        }; 

    
    componentDidMount () {
    
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        this.props.onFetchEvents(token,userId);  
    };
    switchEditHandler =()=>{
        this.setState(prevState=>{
                return {isEditing: !prevState.isEditing}
                
        })
        let token = localStorage.getItem('token')
        let userId = localStorage.getItem('userId')
        this.props.onFetchEvents(token,userId); 
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
   
    onFileUpload = () => { 
  
        // Create an object of formData 
        const formData = new FormData(); 
        let token = localStorage.getItem('token')
        // Update the formData object 
        
        console.log(formData); 
        
        const form = {
            lastname: this.state.lastname,
            phone: this.state.phone,
            }
            console.log(form);
            formData.append("lastname",this.state.lastname);
            formData.append("phone",this.state.phone);
            formData.append( 
                "image", 
                this.state.selectedFile, 
                this.state.selectedFile.name 
              ); 
            let userId = localStorage.getItem('userId')
            let url= ('http://localhost:3001/user/update/'+userId)
            axios.patch(url,formData,{
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            })
            
            
            this.props.onFetchEvents(token,userId); 
            this.setState(prevState=>{
                return {isEditing: !prevState.isEditing}
        })
        console.log(form)
    
        }; 



    
    
    render (){
        let name = this.props.name;
        let email = this.props.email;
        let lastname = this.props.lastname;
        let profession = this.props.profession;
        let phone = this.props.phone;
        let image = this.props.image;
        let imageUrl= 'http://localhost:3001/'+image;
        console.log(image);
        let sidebar = <Sidebar role = {localStorage.getItem('role')}/>;
        let navbar =  <Navbar name ={localStorage.getItem('name')}/>;
        let isAuth
         if(!localStorage.getItem('token')){
            return (
                isAuth = <Redirect to ='/'/>
            )
        }
     
       
        let profile;
        if (!this.state.isEditing){
        profile =(<Profile
                            name={name} 
                            lastname={lastname}
                            email={email}
                            profession={profession}
                            phone={phone}
                            image ={image}
                />);
            }else{

                profile = (
                    <div class="dummy">
                    <div class="emp-profile">
            <table>        
            <tr>
                <td class="colm">
                    <img src={imageUrl} alt="" class="profilepic"/>
                </td> 
                <td class="colm">
                    <h5 class="titlename">{name} {lastname}</h5>           
                 
                    <input  id="upload" ref="upload" class="details" name="image" type="file" accept="image/*"
                        onChange={this.onFileChange}
                         />
                    <div class="details">     
                        <table>
                            <tr>
                                <td><label>Email</label></td>
                                <td><p>{email}</p></td>
                            </tr>
                            <tr>
                                <td><label>First Name</label></td>
                                <td><p>{name}</p></td>
                            </tr>
                            <tr>
                                <td><label>Last Name</label></td>
                                <td> <p><input
                                            name='lastname'
                                            placeholder={lastname}
                                            value={this.state.lastname}
                                            onChange={event => this.handleChange(event)}
                                        />
                                    </p> 
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label>Phone</label></td>
                                <td><p>
                                <input
                                            name='phone'
                                            type="text"
                                            placeholder={phone}
                                            value={this.state.phone}
                                            pattern="[0-9]{10}"
                                            onChange={event => this.handleChange(event)}
                                        />
                                </p></td>
                            </tr>
                                                       
                        </table>                                 
                    </div>                  
                </td>   
            </tr>
            </table>
    </div>
    </div>
                )}




            let stateButton ;
              if (!this.state.isEditing){ 
            stateButton =( <input onClick={this.switchEditHandler}type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>)}
            else{
                stateButton =( <input onClick={this.onFileUpload}type="submit" class="profile-edit-btn" name="btnAddMore" value="Submit"/>)}
            
        console.log('just the name,Im main',this.props.name)
        return(
        <div>
            {navbar}
            {sidebar}
            {profile}
            {stateButton}

            {isAuth}
        </div> 
            
            )
        
    }
    
}

const mapSignInDispatchToProps =dispatch => {
  
    return{
        onFetchEvents:(token,userId) =>dispatch(actions.fetchProfile(token,userId)),
        onUpdateProfile:(lastname,phone,image,token,userId) => dispatch(actions.profileUpdate(lastname,phone,image,token,userId))
    };
};

const mapStatetoProps = state =>{
    console.log('main page',state)
    console.log("down in the props",state.profile.events)
    return {
        name:state.profile.events.fname,
        lastname:state.profile.events.lastname,
        phone:state.profile.events.phone,
        email:state.profile.events.email,
        profession:state.profile.events.profession,
        image: state.profile.events.photo
    };
};


export default connect(mapStatetoProps, mapSignInDispatchToProps)(ProfileDisp);