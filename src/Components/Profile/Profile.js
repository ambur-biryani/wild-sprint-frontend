import { render } from '@testing-library/react';
import React from 'react';
import classes from './Profile.css'
import axios from 'axios';

const profile=(props) =>{
    let name = props.name;
        let email = props.email;
        let lastname = props.lastname;
        let profession = props.profession;
        let phone = props.phone;
        let image = props.image;
        let imageUrl= 'http://localhost:3001/'+image;


       

    return( <div class="dummy">
    <div class="emp-profile">
            <table>        
            <tr>
                <td class="colm">
                    <img src={imageUrl} alt="" class="profilepic"/>
                </td> 
                <td class="colm">
                    <h5 class="titlename">{name} {lastname}</h5>           
                    
                
                    <div class="details">     
                        <table>
                            <tr>
                                <td><label>First Name</label></td>
                                <td><p>{name}</p></td>
                            </tr>
                            <tr>
                                <td><label>Last Name</label></td>
                                <td><p>{lastname}</p></td>
                            </tr>
                            <tr>
                                <td><label>Email</label></td>
                                <td><p>{email}</p></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><label>Phone</label></td>
                                <td><p>{phone}</p></td>
                            </tr>
                                                      
                        </table>                                 
                    </div>                  
                </td>   
            </tr>
            </table>
    </div>
</div>
    )
}
export default profile;