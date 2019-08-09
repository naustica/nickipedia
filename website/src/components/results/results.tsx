import React, {Component} from 'react';
import Octicon, {Settings} from '@primer/octicons-react';

import './results.scss'

import Card from './card/card';
import Loading from './../loading/loading';


class Results extends Component<{match: any}, {resultComponent: any, errors: boolean, term: string, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      resultComponent: null,
      errors: false,
      term: '',
      loading: true
    }
    this.getResults = this.getResults.bind(this)
  }
  getResults(term) {
    this.setState({errors: false})
    fetch('api/search?term=' + term, {
      method: 'get',
    })
    .then ((response => response.json()))
    .then((data) => {
    this.setState({resultComponent: data.map(result => <Card key={result.id} result={result} />), term: term, loading: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({errors: true})
    })
  }
  componentDidMount() {
    const term = this.props.match.params.term
    this.getResults(term)
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.term != prevProps.match.params.term) {
      const term = this.props.match.params.term
      this.getResults(term)
    }
  }
  render() {
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
      <div className="container" style={{paddingTop: "2rem"}}>
        <div className="row">
          <div className="col-3" style={{padding: 0}}>
            <div className="card" id="filter-card">
              <div className="card-body">
                <h4 className="card-title">SEARCH RESULTS</h4>
                <h5 className="card-subtitle" style={{padding: "1rem"}}>{this.state.term}</h5>
                <h6 className="card-subtitle" style={{padding: "2rem"}}><b>FILTER</b></h6>
                <Octicon icon={Settings} size="medium" />
                  <ul className="list-group" style={{listStyleType: "none", textAlign: "center", margin: 0, padding: 0, paddingTop: "1rem"}}>
                    <li className="list-group-item">date</li>
                    <li className="list-group-item">view count</li>
                    <li className="list-group-item">rating</li>
                    <li className="list-group-item">video</li>
                    <li className="list-group-item">pooper</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9" style={{padding: 0, paddingBottom: "2rem"}}>
              {this.state.resultComponent}
            </div>
          </div>
        </div>
    )
    if (this.state.errors === true) {
      return (
        <div style={{textAlign: "center", left: "auto", right: "auto", padding: "10rem"}}><h2>no results :(</h2></div>
      )
    } else {
    return (
      loadingState
  )}
  }
}


export default Results;
