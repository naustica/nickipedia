import React, {Component} from 'react';

import './results.scss'

import Card from './card/card';


class Results extends Component<{match: any}, {resultComponent: any, errors: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      resultComponent: null,
      errors: false
    }
  }
  componentDidMount() {
    const {term} = this.props.match.params
    fetch('api/search?term=' + term, {
      method: 'get',
    })
    .then ((response => response.json()))
    .then((data) => {
    this.setState({resultComponent: data.map(result => <Card key={result.id} result={result} />)})
    })
    .catch(error => {
      console.log(error)
      this.setState({errors: true})
    })
  }
  render() {
    if (this.state.errors === true) {
      return (
        <div>no results :(</div>
      )
    } else {
    return (
      <div className="container">
        {this.state.resultComponent}
      </div>
  )}
  }
}


export default Results;
