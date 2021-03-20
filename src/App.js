import React, { Component } from 'react';
import './App.css';

import Auth from'./Container/Auth/Auth';
import CreateFundraiser from './Container/Dashboard/StartFundraiser/StartFundraiser';
import Logout from'./Container/Auth/Logout/Logout';
import ProfileDisp from './Container/Dashboard/Profile/Profile';
import Events from './Container/Dashboard/Events/Events';
import MyFund from './Container/Dashboard/Fundraiser/Fundraiser';
import MyBills from './Container/Dashboard/MyBills/MyBills'
import OneFundDeets from './Container/Dashboard/OneFundDeets/OneFundDeets';
import DonateEvent from './Container/Dashboard/Donate/Donate';
import Gallery from './Container/Dashboard/Gallery/Gallery';
import DyteMeet from './Container/Dashboard/Dyte/Dyte';
import BlockChain from './Components/BlockChain';
import WithdrawPage from './Container/Dashboard/Fundraiser/withdraw';
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux';

class App extends Component {
  render () {
  return (

    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={Auth}/>

        </Switch>
        <Switch>
        <Route path="/events" exact component={Events}/>
        </Switch>
        <Switch>
        <Route path="/logout" exact component={Logout}/>
        </Switch>
        <Switch>
        <Route path="/profile" exact component={ProfileDisp}/>
        </Switch>
        <Switch>
        <Route path="/fund" exact component={MyFund}/>
        </Switch>
        <Switch>
        <Route path="/StartFundForm" exact component={CreateFundraiser}/>
        </Switch>
      <Switch>
        <Route path="/oneFund" exact component={OneFundDeets}/>
      </Switch>
      <Switch>
        <Route path="/Donate" exact component={DonateEvent}/>
      </Switch>
      <Switch>
        <Route path="/MyBills" exact component={MyBills}/>
      </Switch>
      <Switch>
      <Route path="/Gallery" exact component={Gallery}/>
      </Switch>
      <Switch>
      <Route path="/Dyte" exact component={DyteMeet}/>
      </Switch>
      <Switch>
      <Route path="/blockchain" exact component={BlockChain}/>
      </Switch>
      <Switch>
      <Route path="/withdraw" exact component={WithdrawPage}/>
      </Switch>
    </Router>
    

    </div>

  );
};
}

export default App;
