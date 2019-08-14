import React, {Component} from 'react';
import Octicon, {Settings} from '@primer/octicons-react';

import './results.scss'

import Card from './card/card';
import Loading from './../loading/loading';


class Results extends Component<{match: any}, {errors: boolean, term: string, table: string, data: any, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      errors: false,
      term: '',
      data: [],
      table: 'video',
      loading: true
    }
    this.getResults = this.getResults.bind(this)
    this.updateSorting = this.updateSorting.bind(this)
  }
  getResults(term, table) {
    this.setState({errors: false})
    fetch('api/search?term=' + term + '&table=' + table, {
      method: 'get',
    })
    .then ((response => response.json()))
    .then((data) => {
      this.sortResults(data, 'id')
      this.setState({term: term, data: data, loading: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({errors: true})
    })
  }
  updateSorting(value:any):any {
    const data = this.state.data
    this.sortResults(data, value)
    this.setState({data: data})
  }
  sortResults(data, value) {
    switch(true) {
      case value === 'id':
        data = data.sort((a, b) => a.id - b.id)
        break
      case value === 'date':
        data = data.sort((a, b) => a.timestamp - b.timestamp)
        break
      case value === 'views':
        data = data.sort((a, b) => b.views - a.views)
        break
      case value === 'rating':
        data = data.sort((a, b) => a.id - b.id)
        break
    }
  }
  componentDidMount() {
    const term = this.props.match.params.term
    this.getResults(term, this.state.table)
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.term != prevProps.match.params.term) {
      const term = this.props.match.params.term
      this.getResults(term, this.state.table)
    }
  }
  render() {
    const resultComponent = this.state.data.map(result => <Card key={result.id} result={result} />)
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
                    <li className="list-group-item" value="date" onClick={() => this.updateSorting('date')}>date</li>
                    <li className="list-group-item" value="views" onClick={() => this.updateSorting('views')}>view count</li>
                    <li className="list-group-item" value="rating" onClick={() => this.updateSorting('rating')}>rating</li>
                    <li className="list-group-item" value="video" onClick={() => this.updateSorting('video')}>video</li>
                    <li className="list-group-item" value="pooper" onClick={() => this.updateSorting('pooper')}>pooper</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9" style={{padding: 0, paddingBottom: "2rem"}}>
              {resultComponent}
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
