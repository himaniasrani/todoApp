import './App.css';
import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import MyContext from './utils/MyContext';


class App extends React.Component{
  constructor(props){
    super(props);
    // this.state = {
    //   authenticated: false
    // }
  }

  // authenticatedUser = () => {
  //   this.setState({
  //     authenticated: true
  //   })
  // }

  render(){
    return (
        <MyContext.Consumer>
        {
          (props) => { 
            return ( 
              <Router>
              <Switch>
                {props.authenticated ? <Route path="/" component={LandingPage}/> : <Route path="/" component={Login} />}
                {/* render={ () => <Login authenticatedUser={this.authenticatedUser}/>} */}
                {/* <Route path="/login" component={Login}/> */}
              </Switch>
           </Router> 
            )
        }

      }
        </MyContext.Consumer>
          
       

      
      
    );
  }
  
}

App.contextType = MyContext;

export default App;

