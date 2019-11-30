import React, { Component, ReactNode } from 'react'
import { connect } from 'react-redux'
import { IoMdOptions } from 'react-icons/io'
import { IconContext } from 'react-icons'

import './results.scss'
import { fetchSearchStart, fetchSearchResults, cleanSearchResults } from './../../store/actions/searchActions'

import Card from './card/card'

interface Props {
  match: any,
  dispatch: any,
  search: any
}


@(connect((store: any) => {
  return {
    search: store.search
  }
}) as any)
class Results extends Component<Props> {
  constructor(props: Props) {
    super(props)
    //this.props.search.fetching = true
  }
  public componentWillMount = (): void => {
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.fetchMoreSearchResults)
    const term = this.props.match.params.term
    this.fetchSearchResults(term, this.props.search.table, this.props.search.page)
  }
  public componentWillUnmount = (): void => {
    window.removeEventListener('scroll', this.fetchMoreSearchResults)
    this.props.dispatch(cleanSearchResults())
  }
  private fetchSearchResults = (term: string, table: string, page: number): void =>  {
    Promise.all([
      this.props.dispatch(fetchSearchStart()),
      this.props.dispatch(fetchSearchResults(term, table, page))
    ])
  }
  private fetchMoreSearchResults = (): void => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight,  document.documentElement.scrollHeight, document.documentElement.offsetHeight)
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= documentHeight) {
      this.fetchSearchResults(this.props.search.term, this.props.search.table, this.props.search.page + 1)
    }
  }
  private renderCards = (): ReactNode => {
    if (this.props.search.data.length > 0) {
      return (this.props.search.data.map(result => <Card key={result.id} result={result} fetching={this.props.search.fetching} />))
    }
    if (this.props.search.data.length === 0 && this.props.search.fetched) {
      return (<div style={{height: "100%", width: "100%", fontSize: "16px", textAlign: "center"}}>no results :(</div>)
    }
    if (this.props.search.fetching) {
      let loadingCards = []
      for (let i; i < 8; i++) {
        loadingCards.push(<div className="result-card" />)
      }
      return loadingCards
    }
  }
  private updateSorting = (value:any): any => {
    const data = this.props.search.data
    this.sortResults(data, value)
    this.setState({data: data})
  }
  private sortResults = (data: any, value: string) => {
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
  public componentDidUpdate = (prevProps: Props) => {
    //window.scrollTo(0, 0)
    if (this.props.match.params.term != prevProps.match.params.term) {
      window.scrollTo(0, 0)
      this.props.dispatch(cleanSearchResults())
      const term = this.props.match.params.term
      this.fetchSearchResults(term, this.props.search.table, 1)
    }
  }
  public render = (): ReactNode => {
    const loadingStyles = {} //this.props.search.fetching ? {backgroundColor: "#E0DFDF", color: "transparent", boxShadow: "none", border: "none"} : {}
    return (
      <div className="container" style={{paddingTop: "3rem"}}>
        <div className="row">
          <div className="col-3">
            <div className="filter-card" style={loadingStyles}>
              <div className="filter-card-body">
                <h1 className="filter-card-title">Search Results</h1>
                <h2 className="filter-card-term">{this.props.search.term}</h2>
                <hr />
                <h3 className="filter-card-subtitle">Filter</h3>
                <div className="filter-card-svg">
                  <IconContext.Provider value={{size: "26px"}}>
                    <IoMdOptions />
                  </IconContext.Provider>
                </div>
                  <ul className="list-group" style={{listStyleType: "none", textAlign: "center", margin: 0, paddingTop: "1rem"}}>
                    <li className="list-group-item" value="date" onClick={() => this.updateSorting('date')}>date</li>
                    <li className="list-group-item" value="views" onClick={() => this.updateSorting('views')}>view count</li>
                    <li className="list-group-item" value="rating" onClick={() => this.updateSorting('rating')}>rating</li>
                    <li className="list-group-item" value="video" onClick={() => this.updateSorting('video')}>video</li>
                    <li className="list-group-item" value="pooper" onClick={() => this.updateSorting('pooper')}>pooper</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-9">
              {this.renderCards()}
            </div>
          </div>
        </div>
    )
  }
}


export default Results
