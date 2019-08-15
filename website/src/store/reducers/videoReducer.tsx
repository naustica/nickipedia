interface StateTypes {
  fetching: boolean,
  fetched: boolean,
  error: any,
  data: any,
  suggestions: Array<any>,
  changing: boolean,
  changed: boolean
}

const videoReducer = (state: StateTypes = {
  fetching: false,
  fetched: false,
  error: null,
  data: {} || [],
  suggestions: [],
  changing: false,
  changed : false,
}, action: any) => {
  switch (action.type) {
    case 'fetch_video_start':
      state = {
        ...state,
        fetching: true,
        fetched: false
      }
      break
    case 'receive_video':
      state = {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload.data
      }
      break
    case 'videoViewsIncrement':
      state = {
        ...state,
        data: {
          ...state.data,
          ['views']: state.data.views + 1
        }
      }
      break
    case 'fetch_video_error':
      state = {
        ...state,
        fetching: false,
        error: action.payload
      }
      break
    case 'get_video_suggestions_start':
      state = {
        ...state,
        changing: true,
        changed: false
      }
      break
    case 'get_video_suggestions':
      if (action.payload.page === 'home') {

      }
      state = {
        ...state,
        suggestions: action.payload.suggestions,
        changing: false,
        changed: true
      }
      break
  }
  return state
}

export default videoReducer
