import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './login.scss'

import Loading from './../loading/loading';


class Login extends Component<{history:any}, { username?: string, password?: string, access_token?: string, loading?: boolean, error?: string }> {
  constructor(props:any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      access_token: '',
      loading: false,
      error: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  validateForm(): boolean {
    if (this.state.username === '' || this.state.password === '') {
      this.setState({error: '*username and password required'})
      return false
    }
    return true
  }
  submitForm(event: any): any {
    //var form = event.target as HTMLFormElement;
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({loading: true})
      fetch('api/auth/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      })
        .then ((response => response.json()))
        .then((data) => {
          if (data.access_token === undefined) {
            this.setState({loading: false, error: '*username or password not correct'})
            //form.reset();
          } else {
            this.setState({access_token: data.access_token})
            localStorage.setItem('access_token', this.state.access_token)
            localStorage.setItem('username', this.state.username)
            this.setState({loading: false})
            this.props.history.push('/')
          }})
          .catch(error => {
            this.setState({loading: false})
            console.log(error)
          })
      }
  }
  render() {
    const formBorderColor = this.state.error != '' ? {borderColor: 'red'} : {}
    return (
      <div className="container-login">
        <div className="login-card">
          <div className="login-card-body">
            <h1 className="login-card-title">Login</h1>
            <div className="login-card-error">
              {this.state.error}
            </div>
            <form onSubmit={this.submitForm}>
              <div className="login-form-group">
                <input className="login-form-input" style={formBorderColor} type="text" name="username" autoFocus value={this.state.username} onChange={this.onChange} placeholder="Username"/>
              </div>
              <div className="login-form-group">
                <input className="login-form-input" style={formBorderColor} type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password"/>
              </div>
              <button type="button" className="login-button" onClick={this.submitForm}>Login</button>
              <button type="submit" style={{display: "none"}}></button>
              <div className="login-form-group" style={{fontSize: "16px"}}>
                Dont have an account? <Link to="/register" style={{fontSize: "16px", color: "#1873E8"}}>Sign up</Link>
              </div>
              <div className="login-card-loading">
                <Loading loading={this.state.loading}/>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
  }
}


export default withRouter(Login);
