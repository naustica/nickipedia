import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './results.scss'


class Results extends Component<{match: any}, {}> {
  constructor(props:any) {
    super(props)
  }
  componentDidMount() {
    const {term} = this.props.match.params
    console.log(term)
  }
  render() {
    return (
      <div className="container">
        <div className="card mb-2" id="result-card">
          <Link to='/'>
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src="" className="card-img-top" id="card-img-result" alt="..." />
            </div>
            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">test-title</h5>
                <p className="card-text">test-text</p>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>
  )
  }
}


export default Results;
