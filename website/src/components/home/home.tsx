import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './home.scss'

import Card from './card/card';


class Home extends Component<{},{loading: boolean, resultComponent: any, errors: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      loading: false,
      resultComponent: null,
      errors: false
    }
  }
  componentDidMount() {
    this.setState({loading: true})
    fetch('api/video?all=True', {
      method: 'get',
    })
    .then ((response => response.json()))
    .then((data) => {
      data = data.slice(0, 6)
      this.setState({resultComponent: data.map(result => <Card key={result.id} result={result} />), loading: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({errors: true})
    })
  }
  render() {
    return (
      <div className="container" style={{paddingTop: "2rem"}}>
        <div className="row">
          <div className="col-3" style={{padding: 0}}>
            <div className="card" id="trends-card">
              <div className="card-body">
                <h2 className="card-title">trends</h2>
                <ul style={{listStyleType: "none", textAlign: "left", margin: 0, padding: 0, paddingTop: "1rem"}}>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#kek</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#lel</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#lul</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#kieling</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#marcel davis</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#bachenbenno</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#fistus</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#saas</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#pooper</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>#laal</li></Link>
                </ul>
              </div>
            </div>
            <div className="card" id="trends-card">
              <div className="card-body">
                <h3 className="card-title">key links</h3>
                <ul style={{listStyleType: "none", textAlign: "left", margin: 0, padding: 0, paddingTop: "1rem"}}>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>about</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>contact</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>faq</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>github</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>twitter</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>privacy policy</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>terms of use</li></Link>
                  <Link to={"/"} style={{color: "black"}}><li style={{fontSize: "16px", fontWeight: 500}}>code of conduct</li></Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9" style={{padding: 0, paddingBottom: "2rem", marginTop: "1rem"}}>
          <div className="frontpage-tabs">
            <ul>
              <Link to={"/"}><li>feed</li></Link>
              <Link to={"/"}><li>recommended</li></Link>
              <Link to={"/"}><li>classics</li></Link>
            </ul>
          </div>
            <div className="row" style={{marginLeft: "1rem"}}>
              {this.state.resultComponent}
              {this.state.resultComponent}
            </div>
          </div>
        </div>
      </div>
  )
  }
}

export default withRouter(Home);
