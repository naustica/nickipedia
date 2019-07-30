import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';


import './register.scss'


class Register extends Component<{history:any}, { username?: string, password?: string, email?: string }> {
  constructor(props:any) {
    super(props)
    this.state = {
      username: '',
      email: 'test@kek.de',
      password: 'test'
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
    axios.post('api/user/register', {username: this.state.username, email: this.state.email, password: this.state.password}, {headers: {'Content-Type': 'application/json'}})
      .then(() => {
        this.props.history.push('/login')
      })
      .catch(error => {
        console.log(error)
        form.reset();
      })
  }
  render() {
    return (
      <div className="container" id="register-container">
        <form onSubmit={this.submitForm}>
          <div className="form-group input-group-lg">
            <input className="form-control from-control-lg" type="text" name="username" autoFocus onChange={this.onChange} placeholder="username"/>
          </div>
        </form>
        <div className="register-info">
          <Link to="/login" style={{fontSize: "16px"}}>already have an account?</Link>
        </div>
      </div>
  )
  }
}


export default withRouter(Register);
