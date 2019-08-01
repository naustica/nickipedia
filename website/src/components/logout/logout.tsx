import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';


class Logout extends Component<{},{}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    const cookies = new Cookies();
    if (cookies.get('access_token') != undefined) {
      const access_token = cookies.get('access_token')
      fetch('api/auth/logout', {
        method: 'post',
        headers: new Headers({
          "Authorization": access_token
        })
      })
      cookies.remove('access_token')
      return <Redirect to={{pathname: '/login'}} />
    }
    else {
      return <div>something went wrong :(</div>
    }
  }
}


export default withRouter(Logout);
