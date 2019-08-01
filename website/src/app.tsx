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
import Video from './components/video/video';
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
            <Route path={['/', '/home', '/settings', '/about', '/result/:term', '/watch/:id']} exact component={Navbar} />
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
                                  <Route path='/login' exact component={Login}/>
                                  <Route path='/register' exact component={Register}/>
                                  <AuthenticatedRoute path='/logout' exact component={Logout}/>
                                  <Route path='/result/:term' component={Results}/>
                                  <Route path='/watch/:id' component={Video}/>
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
