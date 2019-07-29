import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import './breadcrumb.scss';


class Breadcrumb extends Component {

    render() {
      return (
          <nav className="nav-breadcrumb" aria-label="breadcrumb">
            <ol className="breadcrumb" id="ol-breadcrumb">
              <li className="breadcrumb-item"><Link to='/'>home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">current page</li>
            </ol>
          </nav>
      )
    }

}


export default Breadcrumb
