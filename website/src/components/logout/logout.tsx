import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';

import Loading from './../loading/loading';


class Logout extends Component<{},{loading: boolean, error: string}> {
  constructor(props:any) {
    super(props)
    this.state = {
      loading: true,
      error: ''
    }
  }
  componentDidMount() {
    if (sessionStorage.getItem('access_token') != undefined) {
      const access_token = sessionStorage.getItem('access_token')
      fetch('api/auth/logout', {
        method: 'post',
        headers: new Headers({
          "Authorization": access_token
        })
      })
      sessionStorage.removeItem('access_token')
    } else {
      this.setState({error: 'something went wrong :('})
      console.log('error')
    }
    this.setState({loading: false})

  }
  render() {
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
        <Redirect to={{pathname: '/login'}} />
    )

    return loadingState

  }
}


export default withRouter(Logout);
