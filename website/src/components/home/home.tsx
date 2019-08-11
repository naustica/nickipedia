import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './home.scss'

import Card from './card/card';
import Loading from './../loading/loading';


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
      this.setState({resultComponent: data.sort((a, b) => a.id - b.id).map(result => <Card key={result.id} result={result} />), loading: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({errors: true})
    })
  }
  render() {
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
      <div className="container" style={{paddingTop: "2rem"}}>
        <div className="row">
          <div className="col-3" style={{padding: 0}}>
            <div className="card" id="trends-card">
              <div className="card-body">
                <h2 className="card-title">trends</h2>
                <ul>
                  <Link to={"/"}><li>#kek</li></Link>
                  <Link to={"/"}><li>#lel</li></Link>
                  <Link to={"/"}><li>#lul</li></Link>
                  <Link to={"/"}><li>#kieling</li></Link>
                  <Link to={"/"}><li>#marcel davis</li></Link>
                  <Link to={"/"}><li>#bachenbenno</li></Link>
                  <Link to={"/"}><li>#fistus</li></Link>
                  <Link to={"/"}><li>#saas</li></Link>
                  <Link to={"/"}><li>#pooper</li></Link>
                  <Link to={"/"}><li>#laal</li></Link>
                </ul>
              </div>
            </div>
            <div className="card" id="links-card">
              <div className="card-body">
                <h3 className="card-title">key links</h3>
                <ul>
                  <Link to={"/"}><li>about</li></Link>
                  <Link to={"/"}><li>contact</li></Link>
                  <Link to={"/"}><li>faq</li></Link>
                  <Link to={"/"}><li>github</li></Link>
                  <Link to={"/"}><li>twitter</li></Link>
                  <Link to={"/"}><li>privacy policy</li></Link>
                  <Link to={"/"}><li>terms of use</li></Link>
                  <Link to={"/"}><li>code of conduct</li></Link>
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
              <div style={{width: "100%", padding: "1rem", textAlign: "center"}}>
                <Link to="/"><h2 className="frontpage-suggestions-h">suggestions</h2></Link>
              </div>
              {this.state.resultComponent}
            </div>
          </div>
        </div>
      </div>
    )
    return loadingState
  }
}

export default withRouter(Home);
