import { render } from '@testing-library/react';
import React from 'react';
import classes from '../Events/Event.css'

const myFunds=(props) =>{
    let name=  props.name;
    let image=  props.image;
    let imageUrl= 'http://localhost:3001/'+image;

    return (
        <div className="col-md-6 col-lg-4 col-xl-3">
        <figure className="snip1527">
          <div className="image"><img src={imageUrl} /></div>
          <figcaption>
            <h3>{name}</h3>
          </figcaption>
          <a ></a>
        </figure>
      </div>
    )}

export default myFunds;