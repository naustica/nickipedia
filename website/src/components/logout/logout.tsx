import React, { Component, ReactNode } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import Loading from './../loading/loading'

interface Props {

}

interface State {
  loading: boolean,
  error: string
}


class Logout extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      loading: true,
      error: ''
    }
  }
  public componentDidMount = (): void => {
    if (localStorage.getItem('access_token') != undefined) {
      const access_token = localStorage.getItem('access_token')
      fetch('api/auth/logout', {
        method: 'post',
        headers: new Headers({
          "Authorization": access_token
        })
      })
      localStorage.removeItem('access_token')
      localStorage.removeItem('username')
    } else {
      this.setState({error: 'something went wrong :('})
      console.log('error')
    }
    this.setState({loading: false})

  }
  public render = (): ReactNode => {
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
        <Redirect to={{pathname: '/login'}} />
    )

    return loadingState

  }
}


export default withRouter(Logout)
