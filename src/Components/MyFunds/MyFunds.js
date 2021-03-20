import { render } from "@testing-library/react";
import React from "react";
import classes from "../Events/Event.css";
import { Card } from "antd";
import "./MyFunds.css"

const { Meta } = Card;

const myFunds = (props) => {
  let name = props.name;
  let image = props.image;
  let scfname =  props.scfname;
  let imageUrl = "http://localhost:3001/" + image;

  console.log(imageUrl);
  return (

    <div className="card-fund-img col-md-3  col-lg-4 col-xl-3">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src={imageUrl}
          />
        }
      >
        <Meta title={scfname} description={name}/>
      </Card>
    </div>
  );
};

export default myFunds;
