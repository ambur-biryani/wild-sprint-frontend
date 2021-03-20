import * as actions from '../../../store/Actions/Index';
import Event from '../../../Components/Events/Event';
import MyFund from '../../../Components/MyFunds/MyFunds';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/SideBar/Sidebar';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Gallery.css';
import FormData from 'form-data';

class Gallery extends Component {
render(){
let sidebar = <Sidebar role = {localStorage.getItem('role')}/>;
let navbar = <Navbar name ={localStorage.getItem('name')}/>;
let RenGallery;
RenGallery=(
<div className="photo-gallery">

<div className="intro">
<h2 className="text-center">Wildsprint Gallery</h2>
<p className="text-center">Take a look at what our kind members across the globe have been involved in!</p>
</div>
<div className="rows photos">
<div className="col-sm-6 col-md-4 col-lg-3 item"><a data-lightbox="photos" href="galleryimg\proj-1.jpg"><img className="img-fluid" src={require("./galleryimg/proj-1.jpg")}/></a></div>
<div className="col-sm-6 col-md-4 col-lg-3 item"><a data-lightbox="photos" href="galleryimg\proj-2.jpg"><img className="img-fluid" src={require("./galleryimg/proj-2.jpg")}/></a></div>
<div className="col-sm-6 col-md-4 col-lg-3 item"><a data-lightbox="photos" href="galleryimg\proj-3.jpg"><img className="img-fluid" src={require("./galleryimg/proj-3.jpg")}/></a></div>
<div className="col-sm-6 col-md-4 col-lg-3 item"><a data-lightbox="photos" href="galleryimg\proj-4.jpg"><img className="img-fluid" src={require("./galleryimg/proj-4.jpg")}/></a></div>
<div className="col-sm-6 col-md-4 col-lg-3 item"><a data-lightbox="photos" href="galleryimg\proj-5.jpg"><img className="img-fluid" src={require("./galleryimg/proj-5.jpg")}/></a></div>
<div className="col-sm-6 col-md-4 col-lg-3 item"><a data-lightbox="photos" href="galleryimg\proj-6.jpg"><img className="img-fluid" src={require("./galleryimg/proj-6.jpg")}/></a></div>

</div>

</div>
)
return(
<div>
{navbar}
{sidebar}
{RenGallery}
</div>
)
}

}

export default Gallery;