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
      dispatch({type: 'receive_video', payload: {id: id, title: data.title, description: data.text, author: data.author_id, filename: data.filename, timestamp: data.timestamp, views: data.views, fetching: false, fetched: true}})
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
    dispatch({type: 'videoViewsIncrement', payload: {}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}
