import React, {Component} from 'react';

import './../video.scss'


class VideoStream extends Component<{author: string, filename: string}, {error: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      error: false,
    }
  }
  async componentDidMount() {
    try {
      const video = await fetch('http://0.0.0.0:8000/videos/' + this.props.author + '/' + this.props.filename, {
        method: 'head'
      })
      /*
      const image = await fetch('http://0.0.0.0:8000/default/background.jpg', {
        method: 'head'
      })
      */
      this.setState({error: false})

    }
    catch {
      this.setState({error: true})
      console.log('[nickipedia] file server didnt respond')
    }
  }
  render() {
    const errorOverlay = this.state.error ? {opacity: 1} : {opacity: 0}
    return (
      <div>
        <video className="card-img-top" poster={""} id="player" style={{width:"100%", height: "auto", borderRadius: "5px", outline: "none", backgroundColor: "#0A0A0A"}} playsInline controls>
          <source src={'http://0.0.0.0:8000/videos/' + this.props.author + '/' + this.props.filename} type="video/mp4"/>
        </video>
        <div id="video-overlay" style={errorOverlay}>
          <h3>video not found.</h3>
        </div>
      </div>
    )
  }
}


export default VideoStream;
