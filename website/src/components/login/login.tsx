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
  submitForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
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
            form.reset();
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
    const formBorderColor = this.state.error != '' ? {borderColor: 'red', backgroundColor: "#F5F5F5"} : {borderColor: 'black', backgroundColor: "#F5F5F5"}
    return (
      <div className="container" id="login-container" style={{padding: "2rem"}}>
        <div className="card" style={{padding: "1.5rem", opacity: 0.95, border: "1px solid #505458", backgroundColor: "#FDF9F3"}}>
          <div className="card-body">
            <h5 className="card-title" style={{textAlign: "center", padding: "2rem"}}>login</h5>
            <div style={{textAlign: "center", color: "red", padding: "1rem"}}>
              {this.state.error}
            </div>
            <form onSubmit={this.submitForm}>
              <div className="form-group input-group-lg" style={{padding: "0.8rem"}}>
                <input className="form-control from-control-lg" style={formBorderColor} type="text" name="username" autoFocus value={this.state.username} onChange={this.onChange} placeholder="username"/>
              </div>
              <div className="form-group input-group-lg" style={{padding: "0.8rem"}}>
                <input className="form-control from-control-lg" style={formBorderColor} type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="password"/>
              </div>
              <div className="form-group input-group-lg" style={{textAlign: "center", padding: "2rem"}}>
                <Link to="/register" style={{fontSize: "16px"}}>dont have an account?</Link>
              </div>
              <button type="submit" style={{display: "none"}}></button>
              <Loading loading={this.state.loading}/>
            </form>
          </div>
        </div>
      </div>
  )
  }
}


export default withRouter(Login);
