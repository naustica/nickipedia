import React, { Component, ReactNode } from 'react'
import { Route, Redirect } from 'react-router-dom'

interface Props {
  component: any,
  path: string,
  exact?: boolean
}

export default class AuthenticatedRoute extends Component<Props> {
  public render = (): ReactNode => {
    const { component: Component, ...rest } = this.props;
    if (localStorage.getItem('access_token') != undefined) {
      return <Route {...rest} render={(props) => <Component {...props} />} />
    } else {
      return <Route {...rest} render={() => <Redirect to={{pathname: '/login'}} />} />
    }
  }
}
