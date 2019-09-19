import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import './app.scss';
import store from './store/store';

import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import Results from './components/results/results';
import Logout from './components/logout/logout';
import Video from './components/video/video';
import Footer from './components/footer/footer';
import Upload from './components/upload/upload';
import Settings from './components/settings/settings';
import AuthenticatedRoute from './components/authentication/authentication';


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
            <Route path={['/', '/home', '/settings', '/about', '/result/:term', '/watch/:id', '/upload']} exact component={Navbar} />
              <div className="app">
                  <Switch>
                    <AuthenticatedRoute path='/' exact component={Home}/>
                    <Route path='/home' exact component={Home}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/about' component={About}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/register' exact component={Register}/>
                    <AuthenticatedRoute path='/upload' exact component={Upload}/>
                    <AuthenticatedRoute path='/logout' exact component={Logout}/>
                    <Route path='/result/:term' component={Results}/>
                    <Route path='/watch/:id' component={Video}/>
                    <Route component={Error}/>
                  </Switch>
                </div>

          </Router>
      )
    }
}


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
