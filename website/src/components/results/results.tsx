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
  }
  componentDidMount() {
    const term = this.props.match.params.term
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
  componentDidUpdate(prevProps) {
    if (this.props.match.params.term != prevProps.match.params.term) {
      const term = this.props.match.params.term
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
  }
  render() {
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
      <div className="container">
        <div className="row">
          <div className="col-3" style={{padding: 0}}>
            <div className="card" id="filter-card">
              <div className="card-body">
                <h4 className="card-title">SEARCH RESULTS</h4>
                <h5 className="card-subtitle" style={{padding: "1rem"}}>{this.state.term}</h5>
                <h6 className="card-subtitle" style={{padding: "2rem"}}><b>FILTER</b></h6>
                <Octicon icon={Settings} size="medium" />
                  <ul style={{listStyleType: "none", textAlign: "center", margin: 0, padding: 0, paddingTop: "1rem"}}>
                    <li>date</li>
                    <li>view count</li>
                    <li>rating</li>
                    <li>video</li>
                    <li>pooper</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9" style={{padding: 0}}>
              {this.state.resultComponent}
            </div>
          </div>
        </div>
    )
    if (this.state.errors === true) {
      return (
        <div>no results :(</div>
      )
    } else {
    return (
      loadingState
  )}
  }
}


export default Results;
