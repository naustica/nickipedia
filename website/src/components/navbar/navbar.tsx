import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

import Breadcrumb from './../breadcrumb/breadcrumb';


class Navbar extends Component {
  render() {
    return (
      <div className="nav-header">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to='/' className="navbar-brand">nickipedia</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' className="nav-link">home</Link>
              </li>
              <li className="nav-item">
                <Link to='/settings' className="nav-link">settings</Link>
              </li>
              <li className="nav-item">
                <Link to='/about' className="nav-link">about</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Breadcrumb />
      </header>
    </div>
  )
  }
}


export default Navbar;
