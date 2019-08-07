import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './home.scss'


class Home extends Component<{},{}> {
  constructor(props:any) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="container">
      </div>
  )
  }
}

export default withRouter(Home);
