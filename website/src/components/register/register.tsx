import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';


import './register.scss'

import Loading from './../loading/loading';


class Register extends Component<{history:any}, { username?: string, password?: string, email?: string, loading?: boolean, error?: string }> {
  constructor(props:any) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      loading: false,
      error: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  validateForm(): boolean {
    if (this.state.username === '' || this.state.password === '' || this.state.email === '') {
      this.setState({error: '*username, email and password required'})
      return false
    }
    return true
  }
  submitForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
    event.preventDefault();
    if (this.validateForm()) {
      fetch('api/user/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password})
      })
      .then((response) => response.json())
        .then((data) => {
          if (data.status != 'success') {
            this.setState({loading: false, error: '*username or email exists'})
            form.reset();
          } else {
            this.props.history.push('/login')
          }
        })
        .catch(error => {
          console.log(error)
          form.reset();
        })
    }
  }
  render() {
    return (
      <div className="container" id="register-container" style={{padding: "2rem"}}>
        <div className="card" style={{padding: "1.5rem", opacity: 0.95, border: "1px solid #505458", backgroundColor: "#FDF9F3"}}>
          <div className="card-body">
            <h5 className="card-title" style={{textAlign: "center", padding: "2rem"}}>registration</h5>
            <div style={{textAlign: "center", color: "red", padding: "1rem"}}>
              {this.state.error}
            </div>
            <form onSubmit={this.submitForm}>
              <div className="form-group input-group-lg" style={{padding: "0.8rem"}}>
                <input className="form-control from-control-lg" type="text" name="username" autoFocus value={this.state.username} onChange={this.onChange} placeholder="username"/>
              </div>
              <div className="form-group input-group-lg" style={{padding: "0.8rem"}}>
                <input className="form-control from-control-lg" type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="email"/>
              </div>
              <div className="form-group input-group-lg" style={{padding: "0.8rem"}}>
                <input className="form-control from-control-lg" type="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="password"/>
              </div>
              <div className="form-group input-group-lg" style={{textAlign: "center", padding: "2rem"}}>
                <Link to="/login" style={{fontSize: "16px"}}>already have an account?</Link>
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


export default withRouter(Register);
