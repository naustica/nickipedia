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
      <div className="container" style={{paddingTop: "2rem"}}>
        <div className="row">
          <div className="col-3" style={{padding: 0}}>
            <div className="card" id="trends-card">
              <div className="card-body">
                <h2 className="card-title">trends</h2>
                <ul className="list-group" style={{listStyleType: "none", textAlign: "left", margin: 0, padding: 0, paddingTop: "1rem"}}>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#kek</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#lel</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#lul</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#kieling</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#marcel davis</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#kek</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#lel</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#lul</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#kieling</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>#marcel davis</li>
                </ul>
              </div>
            </div>
            <div className="card" id="trends-card">
              <div className="card-body">
                <h3 className="card-title">key links</h3>
                <ul className="list-group" style={{listStyleType: "none", textAlign: "left", margin: 0, padding: 0, paddingTop: "1rem"}}>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>about</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>contact</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>faq</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>github</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>twitter</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>privacy policy</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>terms of use</li>
                  <li className="list-group-item" style={{fontSize: "16px", fontWeight: 500}}>code of conduct</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9" style={{padding: 0, paddingBottom: "2rem"}}>
            <div className="card" id="front-page-suggestions">
              <img className="card-img-top" src="" alt="..." />
              <div className="card-body">
                <p className="card-text">test</p>
              </div>
            </div>
            <div className="card" id="front-page-suggestions">
              <img className="card-img-top" src="" alt="..." />
              <div className="card-body">
                <p className="card-text">test</p>
              </div>
            </div>
            <div className="card" id="front-page-suggestions">
              <img className="card-img-top" src="" alt="..." />
              <div className="card-body">
                <p className="card-text">test</p>
              </div>
            </div>
            <div className="card" id="front-page-suggestions">
              <img className="card-img-top" src="" alt="..." />
              <div className="card-body">
                <p className="card-text">test</p>
              </div>
            </div>
            <div className="card" id="front-page-suggestions">
              <img className="card-img-top" src="" alt="..." />
              <div className="card-body">
                <p className="card-text">test</p>
              </div>
            </div>
            <div className="card" id="front-page-suggestions">
              <img className="card-img-top" src="" alt="..." />
              <div className="card-body">
                <p className="card-text">test</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
  }
}

export default withRouter(Home);
