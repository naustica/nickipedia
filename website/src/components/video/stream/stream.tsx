import React, {Component} from 'react';

import './../video.scss'


class VideoStream extends Component<{}, {}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    return (
      <video className="card-img-top" poster="" id="player" style={{width:"100%", borderRadius: "5px", outline: "none"}} playsinline controls>
        <source src="http://0.0.0.0:8000/videos/admin/test.mp4" type="video/mp4" />
      </video>
    )
  }
}


export default VideoStream;
