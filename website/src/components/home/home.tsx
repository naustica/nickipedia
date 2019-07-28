import React, {Component} from 'react';

import './home.css'


class Home extends Component<{}, { term: string }> {
  constructor(props:never) {
    super(props)
    this.state = {
      term: ''
    }
    this.changeTerm = this.changeTerm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  changeTerm(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({term: event.target.value})
  }
  submitForm() {
    console.log(this.state.term)
  }
  render() {
    return (
      <div className="container" id="searchform-container">
        <form onSubmit={this.submitForm}>
          <input id="searchform-textarea" type="text" name="search" onChange={this.changeTerm} autoFocus placeholder="search..."/>
        </form>
      </div>
  )
  }
}


export default Home;
