import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';


class AuthenticatedRoute extends Component<{component: any, path: string, exact?: boolean},{}> {
  render() {
    const {component: Component, ...rest} = this.props;
    const cookies = new Cookies();
    if (cookies.get('access_token') != undefined) {
      return <Route {...rest} render={(props) => <Component {...props} />} />
    } else {
      return <Route {...rest} render={() => <Redirect to={{pathname: '/login'}} />} />
    }
  }
}


export default AuthenticatedRoute
