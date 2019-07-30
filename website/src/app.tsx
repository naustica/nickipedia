import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './app.scss';

import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import Results from './components/results/results';
import Logout from './components/logout/logout';
import AuthenticatedRoute from './components/authentication/authentication';


function Settings() {
  return <h2>settings</h2>
}

function About() {
  return <h2>about</h2>
}

function Error() {
  return <h2>error</h2>
}


class App extends Component {
    render() {
      return (
          <Router>
            <Navbar />
              <div className="app">
                  <div className="container">
                      <div className="row">
                          <div className="col">
                              <div>
                                <Switch>
                                  <AuthenticatedRoute path='/' exact component={Home}/>
                                  <Route path='/home' exact component={Home}/>
                                  <Route path='/settings' component={Settings}/>
                                  <Route path='/about' component={About}/>
                                  <Route path='/login' component={Login}/>
                                  <Route path='/register' component={Register}/>
                                  <AuthenticatedRoute path='/logout' component={Logout}/>
                                  <Route path='/result/:term' component={Results}/>
                                  <Route component={Error}/>
                                </Switch>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
          </Router>
      )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
