import React, {Component} from 'react';

import './../video.scss'


class VideoStream extends Component<{author: string, filename: string}, {}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    return (
      <video className="card-img-top" poster={"http://0.0.0.0:8000/default/background.jpg"} id="player" style={{width:"100%", borderRadius: "5px", outline: "none"}} playsInline controls>
        <source src={"http://0.0.0.0:8000/videos/" + this.props.author + "/" + this.props.filename} type="video/mp4"/>
      </video>
    )
  }
}


export default VideoStream;
