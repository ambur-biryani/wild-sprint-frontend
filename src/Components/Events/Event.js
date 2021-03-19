import { render } from '@testing-library/react';
import React from 'react';
import classes from './Event.css'
import axios from 'axios';
import {withRouter} from 'react-router-dom';


const event=(props) =>{
    let name= props.name;
    let image = props.image;
    let fundId = props.fundId;
    console.log("JSX ELEMENT name",name);
    console.log("JSX ELEMENT image",image);
    
    let imageUrl= 'http://localhost:3001/'+image;
    console.log(imageUrl)
    return(
        <div className="col-md-6 col-lg-4 col-xl-3">
          <figure className="snip1527" >
            <div className="image"><img src={imageUrl} /></div>
            <figcaption>
              <div className="date"><span className="day">GO</span><span className="month">FUND!</span></div>
              <h3>{name}</h3>
            </figcaption>
            <a ></a>
          </figure>
        </div>
        );
}

export default withRouter(event);