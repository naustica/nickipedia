import React, { Component } from 'react'

import './login.scss'

import LoginForm from './forms/login'
import RegisterForm from './forms/register'

interface ReadOnly {

}
interface WriteOnly {
  form: string
}

class Login extends Component<ReadOnly, WriteOnly> {
  constructor(props: any) {
    super(props)
    this.state = {
      form: 'login'
    }
  }

  changeForm = (): void => {
    const { form } = this.state
    if (form === 'login') {
      this.setState({form: 'register'})
    }
    if (form === 'register') {
      this.setState({form: 'login'})
    }
  }

  renderForm = (): any => {
    const { form } = this.state

    if (form === 'login') {
      return (
        <LoginForm />
      )
    }
    if (form === 'register') {
      return (
        <RegisterForm />
      )
    }
  }

  renderInfo = (): any => {
    const { form } = this.state
      if (form === 'login') {
        return (
          <div className="login-info-box">
            <h1>Dont have an account?</h1>
            <button className="btn login-info-box-button" onClick={this.changeForm}>Sign up</button>
          </div>
        )
      }
      if (form === 'register') {
        return (
          <div className="login-info-box">
            <h1>Already have an account?</h1>
            <button className="btn login-info-box-button" onClick={this.changeForm}>Sign in</button>
          </div>
        )
      }
  }

  render() {
    return (
      <div className="container-login">
        <div className="login-form-wrapper">
          <div className="login-left-form">
            {this.renderForm()}
          </div>
          <div className="login-right-info">
            <div className="login-right-info-header">nickipedia</div>
            <div className="login-right-info-text">
              {this.renderInfo()}
            </div>
          </div>
        </div>
      </div>
  )
  }
}


export default Login
