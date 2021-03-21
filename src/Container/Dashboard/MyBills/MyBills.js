//import Event from '../../../Components/Events/Event';
//import axios from 'axios';
import * as actions from "../../../store/Actions/Index";
import classes from "./MyBills.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar";
import Sidebar from "../../../Components/SideBar/Sidebar";
import React, { Component } from "react";
import { connect } from "react-redux";

class MyBills extends Component {
  state = {
    eventNameArr: [],
    changeFundId: null,
    loading: true,
  };
  componentDidMount() {
    let token = localStorage.getItem("token");
    this.props.onFetchBills(token);
  }
  render() {
    //let eventsArr = this.props.events.events;
    //console.log(eventsArr.length,"THIS IS MAIN");
    let sidebar = <Sidebar role={localStorage.getItem("role")} />;
    let navbar = <Navbar name={localStorage.getItem("name")} />;

    let Bills = <Spinner />;
    let billsArr = this.props.bills;
    if (this.props.loading === false) {
      let billsArr = this.props.bills;
      console.log("JUST CHECKING", billsArr);
      const len = billsArr.length;
      for (let i = 0; i < len; i++) {
        //console.log(i);
        this.state.eventNameArr.push({
          billId: billsArr[i]._id,
          amount: billsArr[i].amount,
          fundId: billsArr[i].fundId,
          tax: billsArr[i].tax,
          total: billsArr[i].total,
        });
        console.log("EVENT NAME", this.state.eventNameArr);
      }

      Bills = this.state.eventNameArr.map((event) => (
        <div className="card-fund-img col-md-6  col-lg-6 col-xl-6">
        <table class="each-bill">
          <tr class="bill-item">
            <td>Bill id</td>
            <td>{event.billId}</td>
          </tr>
          <tr class="bill-item">
            <td>Event</td>
            <td>{event.fundId}</td>
          </tr>
          <tr class="bill-item">
            <td>Donated Amount</td>
            <td>{event.amount}</td>
          </tr>
        </table>
        </div>
      ));
    }

    let TokenExpRedirect = null;
    if (!localStorage.getItem("token")) {
      TokenExpRedirect = <Redirect to="/" />;
    }

    return (
      <div>
        {navbar}
        {sidebar}
        <div class="row bills">
          <h1>ALL BILLS</h1>
          <div className="row">{Bills}</div>
        </div>
      </div>
    );
  }
}

const mapSignInDispatchToProps = (dispatch) => {
  return {
    onFetchBills: (token) => dispatch(actions.fetchBills(token)),
  };
};
const mapStatetoProps = (state) => {
  console.log("main page", state);
  console.log("loadingState", state.myBills.loading);
  return {
    bills: state.myBills.events,
    loading: state.myBills.loading,
  };
};

export default connect(mapStatetoProps, mapSignInDispatchToProps)(MyBills);
