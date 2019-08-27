interface StateTypes {
  fetching: boolean,
  fetched: boolean,
  error: any,
}

const authenticationReducer = (state: StateTypes = {
  fetching: false,
  fetched: false,
  error: null,
}, action: any) => {
  switch (action.type) {
    case 'fetch_authentication_start':
      state = {
        ...state,
        fetching: true,
        fetched: false
      }
      break
    case 'authentication_error':
      state = {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload.error
      }
      break
    case 'authentication_success':
      state = {
        ...state,
        fetching: false,
        fetched: true,
      }
  }
  return state
}

export default authenticationReducer
