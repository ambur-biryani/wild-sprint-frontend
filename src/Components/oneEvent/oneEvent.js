import { render } from '@testing-library/react';
import React from 'react';
import classes from './oneEvent.css'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
const oneEvent=(props) =>{
    console.log('MEH EH MEH',props)
        let name = props.name;
        let scientificName = props.scientificName;
        let habitat = props.habitat;
        let status = props.status;
        let description = props.description;
        let image = props.image;
        let imageUrl= 'http://localhost:3001/'+image;
        
       

    return(<div class="dummy">

        <div class="emp-profile">
            <table>        
                <tr>
                    <td class="colm">
                        <img src={imageUrl} alt="" class="fund-profilepic"/>
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
                                    <td><p>{scientificName}</p></td>
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
                            </table>                                 
                        </div>                  
                    </td>   
                </tr>
            </table>
        </div>
    </div>
    )
}
export default oneEvent;