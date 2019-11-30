import React, { Component, ReactNode } from 'react'
import { withRouter } from 'react-router-dom'

import './../login.scss'

import Loading from './../../loading/loading'

interface Props {
  history: any
}

interface State {
  username?: string,
  password?: string,
  access_token?: string,
  loading?: boolean,
  error?: string,
  errorUsername?: string,
  errorPassword?: string
}


class LoginForm extends Component<Props, State> {
  constructor(props: any) {
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
  }
  private onChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({[event.target.name]: event.target.value})
  }
  private validateForm = (): boolean => {
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
  private submitForm = async (event: any): Promise<void> => {
    event.preventDefault()
    this.setState({error: '', errorUsername: '', errorPassword: ''})
    if (this.validateForm()) {
      this.setState({loading: true})
      try {
        const response = await fetch('api/auth/login', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username: this.state.username, password: this.state.password})
        })
        if (!response.ok) {
          if (response.status === 500) {
            this.setState({loading: false, error: '*no database connection'})
            throw this.state.error
          }
          if (response.status === 400) {
            this.setState({loading: false, error: '*Username or Password not correct'})
            throw this.state.error
          }
          else {
            this.setState({loading: false, error: response.statusText})
            throw this.state.error
          }
        }
        const data = await response.json()
        this.setState({access_token: data.access_token})
        localStorage.setItem('access_token', this.state.access_token)
        localStorage.setItem('username', this.state.username)
        this.setState({loading: false})
        this.props.history.push('/')
      }
      catch (error) {
        console.log(error)
      }
    }
  }
  public render = (): ReactNode => {

    const { loading } = this.state

    return (
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
              <div className="login-form-group">
                <div className="login-form-forgot-password">
                  Forgot Password?
                </div>
              </div>
              <button type="button" className="btn login-button" onClick={this.submitForm}>{loading ? <div className="login-card-loading">
                <Loading loading={this.state.loading}/>
              </div> : "Sign in"}</button>
              <button type="submit" style={{display: "none"}}></button>
            </form>
          </div>
        </div>
      )
  }
}


export default withRouter(LoginForm)
