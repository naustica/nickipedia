export function fetchVideoStart() {
  return {
    type: 'fetch_video_start',
    payload: {}
  }
}

export function fetchVideo(id: number) {
  return async function(dispatch: any) {
    try {
    const response = await fetch('api/video?video_id=' + id, {
      method: 'get'
    })
    const data = await response.json()
      dispatch({type: 'receive_video', payload: {data: data, fetching: false, fetched: true}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}

export function fetchVideos() {
  return async function(dispatch: any) {
    try {
    const response = await fetch('api/video?all=True', {
      method: 'get'
    })
    const data = await response.json()
      dispatch({type: 'receive_video', payload: {data: data, fetching: false, fetched: true}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}

export function addView(id: number, views: number) {
  return async function(dispatch: any) {
    try {
    const access_token = sessionStorage.getItem('access_token')
    const response = await fetch('api/video?video_id=' + id, {
      method: 'put',
      headers: new Headers({
        "Authorization": access_token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({views: views +1})
    })
    dispatch({type: 'videoViewsIncrement', payload: {id: id}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}

export function getVideoSuggestionsStart() {
  return {
    type: 'get_video_suggestions_start',
    payload: {}
  }
}

export function getVideoSuggestions(id: number, limit: number) {
  return async function(dispatch: any) {
    try {
      const response = await fetch('api/video?all=True', {
        method: 'get'
      })
      const data = await response.json()
      let suggestions = []
      for (var i=0; suggestions.length < limit; i++) {
        let index = Math.floor(Math.random() * Object.keys(data).length)
        if (data[index].id === Number(id) || suggestions.find(x => x.id === data[index].id)) {
          continue
        }
        else {
          suggestions.push(data[index])
        }
      }
      dispatch({type: 'get_video_suggestions', payload: {suggestions: suggestions}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}
