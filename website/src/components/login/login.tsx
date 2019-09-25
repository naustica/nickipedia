import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './login.scss'

import Loading from './../loading/loading';

interface ReadOnly {
  history:any
}

interface WriteOnly {
  username?: string,
  password?: string,
  access_token?: string,
  loading?: boolean,
  error?: string,
  errorUsername?: string,
  errorPassword?: string
}


class Login extends Component<ReadOnly, WriteOnly> {
  constructor(props:any) {
    super(props)
    this.state = {
      username: '',
      password: '',
      access_token: '',
      loading: false,
      error: '',
      errorUsername: '',
      errorPassword: ''

    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  validateForm = (): boolean => {
    let errorMessage: boolean = false
    if (this.state.username === '') {
      this.setState({errorUsername: '*Username required'})
      errorMessage = true
    }
    if (this.state.password === '') {
      this.setState({errorPassword: '*Password required'})
      errorMessage = true
    }
    if (errorMessage === true) {
      return false
    }
    return true
  }
  submitForm(event: any): any {
    //var form = event.target as HTMLFormElement;
    event.preventDefault();
    this.setState({error: '', errorUsername: '', errorPassword: ''})
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
            this.setState({loading: false, error: '*Username or Password not correct'})
            //form.reset();
          } else {
            this.setState({access_token: data.access_token})
            localStorage.setItem('access_token', this.state.access_token)
            localStorage.setItem('username', this.state.username)
            this.setState({loading: false})
            this.props.history.push('/')
          }})
          .catch(error => {
            this.setState({loading: false, error: '*no database connection'})
            console.log(error)
          })
      }
  }
  render() {
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
                <div className="login-form-error">
                  {this.state.errorUsername}
                </div>
                <input className="login-form-input" type="text" name="username" autoFocus value={this.state.username} onChange={this.onChange} placeholder="Username"/>
                <label className="login-label">
                  <span className="login-content">Username</span>
                </label>
              </div>
              <div className="login-form-group">
                <div className="login-form-error">
                  {this.state.errorPassword}
                </div>
                <input className="login-form-input" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Password"/>
                <label className="login-label">
                  <span className="login-content">Password</span>
                </label>
              </div>
              <button type="button" className="login-button" onClick={this.submitForm}>Sign in</button>
              <button type="submit" style={{display: "none"}}></button>
              <div className="login-form-group" style={{fontSize: "15px"}}>
                Dont have an account? <Link to="/register" style={{fontSize: "15px", color: "#1873E8"}}>Sign up</Link>
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
