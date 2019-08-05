import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './home.scss'


class Home extends Component<{ history: any }, { term: string, options: any, suggestions: Array<any>, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      term: '',
      options: [],
      suggestions: [],
      loading: false
    }
    this.getTerm = this.getTerm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  componentDidMount() {
    this.setState({loading: true})
    fetch('api/video?all=True', {
    })
      .then ((response => {
        const status = response.status
        const data = response.json()
        return Promise.all([status, data])
      }))
      .then(([status, data]) => {
        if (status === 200) {
          let options = new Set([])
          let words = []
          var i
          const results = data.map(result => result.title.split(' '))
          for (i=0; i < data.length; i++) {
            words = words.concat(results[i])
          }
          for (i=0; i < words.length; i++) {
            let word = words[i].replace(/[&\/\\,+()$~%.'":*?<>{}]/g, '')
            options = options.add(word)
          }
          this.setState({options: Array.from(options)})
        }
        else {
          this.setState({loading: false})
          console.log(status)
        }
        })
        .catch(error => {
          console.log(error)
        })
  }
  getTerm(event:React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
    suggestions = this.state.options.sort().filter(v => regex.test(v))
    suggestions = suggestions.slice(0, 5)
    }
    this.setState({term: value, suggestions: suggestions})
  }
  suggestionsSelected(value) {
    this.setState({term: value, suggestions: []})
    this.props.history.push('/result/' + value)
  }
  renderSuggestions() {
    if (this.state.suggestions.length === 0) {
      return null
    }
    return (
      <ul className="search-suggestions">
        {this.state.suggestions.map((item => <li key={item} onClick={() => this.suggestionsSelected(item)}>{item}</li>))}
      </ul>
    )
  }
  submitForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
    event.preventDefault();
    fetch('api/search?term=' + this.state.term)
      .then(() => {
        this.props.history.push('/result/' + this.state.term)
      })
      .catch(error => {
        console.log(error)
        form.reset();
      })
  }
  render() {
    const style = this.state.suggestions.length > 0 ? {borderBottomRightRadius: "0px", borderBottomLeftRadius: "0px", borderTop: "0px"} : {}
    return (
      <div className="container" id="searchform-container">
        <form method="POST" onSubmit={this.submitForm} style={{position: "fixed", width: "100%"}}>
          <div className="form-group input-group-lg">
            <input className="form-control from-control-lg" id="form-control-search" type="text" name="search" style={style} value={this.state.term} onChange={this.getTerm} autoFocus placeholder="search..."/>
            {this.renderSuggestions()}
          </div>
        </form>
      </div>
  )
  }
}

export default withRouter(Home);
