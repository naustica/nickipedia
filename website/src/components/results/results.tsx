import React, {Component} from 'react';
import Octicon, {Settings} from '@primer/octicons-react';
import {connect} from 'react-redux';

import './results.scss';
import {fetchSearchStart, fetchSearchResults, cleanSearchResults} from './../../store/actions/searchActions';

import Card from './card/card';


@(connect((store: any) => {
  return {
    search: store.search
  }
}) as any)
class Results extends Component<{match: any, dispatch: any, search: any}, {}> {
  constructor(props:any) {
    super(props)
    this.fetchMoreSearchResults = this.fetchMoreSearchResults.bind(this);
  }
  componentWillMount() {
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.fetchMoreSearchResults)
    const term = this.props.match.params.term
    this.fetchSearchResults(term, this.props.search.table, this.props.search.page)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchMoreSearchResults)
    this.props.dispatch(cleanSearchResults())
  }
  fetchSearchResults(term: string, table: string, page: number) {
    Promise.all([
      this.props.dispatch(fetchSearchStart()),
      this.props.dispatch(fetchSearchResults(term, table, page))
    ])
  }
  fetchMoreSearchResults() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= documentHeight) {
      this.fetchSearchResults(this.props.search.term, this.props.search.table, this.props.search.page + 1)
    }
  }
  renderCards() {
    if (this.props.search.data.length > 0) {
      return (this.props.search.data.map(result => <Card key={result.id} result={result} fetching={this.props.search.fetching} />))
    }
    else {
      return (<div style={{height: "100%", width: "100%", fontSize: "16px", textAlign: "center"}}>no results :(</div>)
    }
  }
  updateSorting(value:any):any {
    const data = this.props.search.data
    this.sortResults(data, value)
    this.setState({data: data})
  }
  sortResults(data: any, value: string) {
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
  componentDidUpdate(prevProps: any) {
    //window.scrollTo(0, 0)
    if (this.props.match.params.term != prevProps.match.params.term) {
      window.scrollTo(0, 0)
      this.props.dispatch(cleanSearchResults())
      const term = this.props.match.params.term
      this.fetchSearchResults(term, this.props.search.table, 1)
    }
  }
  render() {
    const loadingStyles = {} //this.props.search.fetching ? {backgroundColor: "#E0DFDF", color: "transparent", boxShadow: "none", border: "none"} : {}
    return (
      <div className="container" style={{paddingTop: "2rem"}}>
        <div className="row">
          <div className="col-3" style={{padding: 0}}>
            <div className="card" id="filter-card" style={loadingStyles}>
              <div className="card-body">
                <h4 className="card-title">SEARCH RESULTS</h4>
                <h5 className="card-subtitle" style={{padding: "1rem"}}>{this.props.search.term}</h5>
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
              {this.renderCards()}
            </div>
          </div>
        </div>
    )
  }
}


export default Results;
