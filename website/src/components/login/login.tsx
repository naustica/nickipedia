import React, { Component, ReactNode } from 'react'

import './login.scss'

import LoginForm from './forms/login'
import RegisterForm from './forms/register'

interface Props {

}
interface State {
  form: string
}

class Login extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      form: 'login'
    }
  }

  private changeForm = (): void => {
    const { form } = this.state
    if (form === 'login') {
      this.setState({form: 'register'})
    }
    if (form === 'register') {
      this.setState({form: 'login'})
    }
  }

  private renderForm = (): ReactNode => {
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

  private renderInfo = (): ReactNode => {
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

  public render = (): ReactNode => {
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
