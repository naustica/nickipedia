import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, HashRouter, Route, Switch, Link} from 'react-router-dom';

import './app.css';

import Navbar from './components/navbar/navbar';


function Index() {
  return <h2>home</h2>
}

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
          <HashRouter>
            <Navbar />
              <div className="app">
                  <div className="container">
                      <div className="row">
                          <div className="col">
                              <div>
                                <Switch>
                                  <Route path='/' exact component={Index}/>
                                  <Route path='/home' exact component={Index}/>
                                  <Route path='/settings' component={Settings}/>
                                  <Route path='/about' component={About}/>
                                  <Route component={Error}/>
                                </Switch>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
          </HashRouter>
      )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
