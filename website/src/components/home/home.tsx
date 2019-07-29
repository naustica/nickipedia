import React, {Component} from 'react';
import axios from 'axios';

import './home.scss'


class Home extends Component<{}, { term: string }> {
  constructor(props:never) {
    super(props)
    this.state = {
      term: ''
    }
    this.getTerm = this.getTerm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  getTerm(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({term: event.target.value})
  }
  submitForm(event:React.FormEvent<HTMLFormElement>): void {
    var form = event.target as HTMLFormElement;
    event.preventDefault();
    axios.get('api/search?term=' + this.state.term)
      .then(response => {
        const results = response.data;
        console.log(results);
      })
      .catch(error => {
        console.log(error)
        form.reset();
      })
  }
  render() {
    return (
      <div className="container" id="searchform-container">
        <form method="POST" onSubmit={this.submitForm}>
          <div className="form-group input-group-lg">
            <input className="form-control from-control-lg" type="text" name="search" onChange={this.getTerm} autoFocus placeholder="search..."/>
          </div>
        </form>
      </div>
  )
  }
}


export default Home;
