import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/SideBar/Sidebar";
import React, { Component } from "react";

import classes from "./Gallery.css";
import GalleryComp from "react-grid-gallery";

class Gallery extends Component {
  render() {
    let sidebar = <Sidebar role={localStorage.getItem("role")} />;
    let navbar = <Navbar name={localStorage.getItem("name")} />;
    let RenGallery;
    RenGallery = (
      <div className="photo-gallery">
        <div className="intro">
          <h2 className="text-center">Wildsprint Gallery</h2>
          <p className="text-center">
            Take a look at what our kind members across the globe have been
            involved in!
          </p>
        </div>
        <div className="rows photos">
          <div className="col-sm-6 col-md-4 col-lg-3 item">
            <a data-lightbox="photos" href="galleryimg\proj-1.jpg">
              <img
                className="img-fluid"
                src={require("./galleryimg/proj-1.jpg")}
              />
            </a>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 item">
            <a data-lightbox="photos" href="galleryimg\proj-2.jpg">
              <img
                className="img-fluid"
                src={require("./galleryimg/proj-2.jpg")}
              />
            </a>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 item">
            <a data-lightbox="photos" href="galleryimg\proj-3.jpg">
              <img
                className="img-fluid"
                src={require("./galleryimg/proj-3.jpg")}
              />
            </a>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 item">
            <a data-lightbox="photos" href="galleryimg\proj-4.jpg">
              <img
                className="img-fluid"
                src={require("./galleryimg/proj-4.jpg")}
              />
            </a>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 item">
            <a data-lightbox="photos" href="galleryimg\proj-5.jpg">
              <img
                className="img-fluid"
                src={require("./galleryimg/proj-5.jpg")}
              />
            </a>
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 item">
            <a data-lightbox="photos" href="galleryimg\proj-6.jpg">
              <img
                className="img-fluid"
                src={require("./galleryimg/proj-6.jpg")}
              />
            </a>
          </div>
        </div>
      </div>
    );

    const IMAGES = [
      {
        src: require("./galleryimg/proj-1.jpg"),
        thumbnail:
        require("./galleryimg/proj-1.jpg"),
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-2.jpg"),
        thumbnail:
        require("./galleryimg/proj-2.jpg"),
        thumbnailWidth: 320,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-3.jpg"),
        thumbnail:
        require("./galleryimg/proj-3.jpg"),
        thumbnailWidth: 320,
        thumbnailHeight: 230,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },{
        src: require("./galleryimg/proj-4.jpg"),
        thumbnail:
        require("./galleryimg/proj-4.jpg"),
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-5.jpg"),
        thumbnail:
        require("./galleryimg/proj-5.jpg"),
        thumbnailWidth: 320,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-6.jpg"),
        thumbnail:
        require("./galleryimg/proj-6.jpg"),
        thumbnailWidth: 320,
        thumbnailHeight: 230,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },{
        src: require("./galleryimg/proj-7.jpeg"),
        thumbnail:
        require("./galleryimg/proj-7.jpeg"),
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-8.jpeg"),
        thumbnail:
        require("./galleryimg/proj-8.jpeg"),
        thumbnailWidth: 320,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-9.jpeg"),
        thumbnail:
        require("./galleryimg/proj-9.jpeg"),
        thumbnailWidth: 320,
        thumbnailHeight: 230,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },{
        src: require("./galleryimg/proj-10.jpeg"),
        thumbnail:
        require("./galleryimg/proj-10.jpeg"),
        thumbnailWidth: 320,
        thumbnailHeight: 174,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-11.jpeg"),
        thumbnail:
        require("./galleryimg/proj-11.jpeg"),
        thumbnailWidth: 320,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
      {
        src: require("./galleryimg/proj-12.jpeg"),
        thumbnail:
        require("./galleryimg/proj-12.jpeg"),
        thumbnailWidth: 320,
        thumbnailHeight: 230,
        isSelected: true,
        caption: "After Rain (Jeshu John - designerspics.com)",
      },
    ];
    return (
      <div>
      {navbar}
      {sidebar}
      <div className="galComp"><GalleryComp images={IMAGES}/></div>
        
      </div>
    );
  }
}

export default Gallery;
