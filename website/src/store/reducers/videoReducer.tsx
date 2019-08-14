const videoReducer = (state = {
  fetching: false,
  fetched: false,
  error: null,
  id : 0,
  title: '',
  description: '',
  author: '',
  filename: '',
  timestamp: '',
  views: 0,
}, action: any) => {
  switch (action.type) {
    case 'fetch_video_start':
      state = {
        ...state,
        fetching: true
      }
      break
    case 'receive_video':
      state = {
        ...state,
        fetching: false,
        fetched: true,
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        author: action.payload.author,
        filename: action.payload.filename,
        timestamp: action.payload.timestamp,
        views: action.payload.views
      }
      break
    case 'videoViewsIncrement':
      state = {
        ...state,
        views: state.views + 1
      }
      break
    case 'fetch_video_error':
      state = {
        ...state,
        fetching: false,
        error: action.payload
      }
  }
  return state
}

export default videoReducer
