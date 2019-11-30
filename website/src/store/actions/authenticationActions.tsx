export const fetchAuthenticationStart = () => {
  return {
    type: 'fetch_authentication_start',
    payload: {}
  }
}

export const fetchAuthenticationLogin = (username: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('api/auth/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      })
      const data = await response.json()

      if (data.access_token === undefined) {
        dispatch({type: 'authentication_error', payload: {fetching: false, fetched: true, error: '*username or password not correct'}})
        // form.reset();
      } else {
        dispatch({type: 'authentication_success', payload: {fetching: false, fetched: true}})
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('username', data.username)
        // this.props.history.push('/')
      }
    }
    catch (error) {
        dispatch({type: 'authentication_error', payload: {error: error}})
        console.log(error)
    }
  }
}

export const fetchAuthenticationLogout = () => {
  return async (dispatch: any) => {
    try {
      if (localStorage.getItem('access_token') != undefined) {
        const access_token = localStorage.getItem('access_token')
        const response = await fetch('api/auth/logout', {
          method: 'post',
          headers: {'Authorization': access_token}
        })
        localStorage.removeItem('access_token')
        localStorage.removeItem('username')
      } else {
        dispatch({type: 'authentication_error', payload: {error: 'something went wrong :('}})
      }
      dispatch({fetching: false})
    }
    catch (error) {
      dispatch({type: 'authentication_error', payload: {error: error}})
    }
  }
}

export const fetchAuthenticationRegister = (username: string, email: string, password: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('api/user/register', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, email: email, password: password})
      })
      const data = await response.json()
      if (data.status != 'success') {
        dispatch({type: 'authentication_error', payload: {fetching: false, error: '*username or email exists'}})
        // form.reset();
      } else {
        // this.props.history.push('/login')
        dispatch({type: 'authentication_success', payload: {fetching: false, fetched: true}})
      }
    }
    catch (error) {
      dispatch({type: 'authentication_error', payload: {error: error}})
      console.log(error)
      // form.reset();
    }
  }
}

export const fetchUser = (username: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch('api/user?username=' + username, {
        method: 'get'
      })
      const data = await response.json()
      dispatch({type: 'fetch_user', payload: {data: data}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}
