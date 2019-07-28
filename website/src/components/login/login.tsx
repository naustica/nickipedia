import React, {Component} from 'react';

import './login.css'


class Login extends Component<{}, { username?: string, password?: string}> {
  constructor(props:never) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  submitForm() {
    console.log(this.state.username)
  }
  render() {
    return (
      <div className="container" id="login-container">
        <form onSubmit={this.submitForm}>
          <input id="login-username" type="text" name="username" autoFocus onChange={this.onChange} placeholder="username"/>
        </form>
      </div>
  )
  }
}


export default Login;
