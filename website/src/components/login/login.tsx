import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';

import './login.scss'


class Login extends Component<{history:any}, { username?: string, password?: string, access_token?: string }> {
  constructor(props:any) {
    super(props)
    this.state = {
      username: '',
      password: 'test',
      access_token: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  submitForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
    event.preventDefault();
    axios.post('api/auth/login', {username: this.state.username, password: this.state.password}, {headers: {'Content-Type': 'application/json'}})
      .then((response) => {
        const cookies = new Cookies();
        this.setState({access_token: response.data.access_token})
        cookies.set('access_token', this.state.access_token, {path: '/'})
        this.props.history.push('/')
      })
      .catch(error => {
        console.log(error)
        form.reset();
      })
  }
  render() {
    return (
      <div className="container" id="login-container">
        <form onSubmit={this.submitForm}>
          <div className="form-group input-group-lg">
            <input className="form-control from-control-lg" type="text" name="username" autoFocus onChange={this.onChange} placeholder="username"/>
          </div>
        </form>
      </div>
  )
  }
}


export default withRouter(Login);
