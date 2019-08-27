import React, {Component} from 'react';
import ReactPlayer from 'react-player';

import './../video.scss'


class VideoStream extends Component<{author: string, filename: string, loading: boolean}, {error: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      error: false,
    }
  }
  async componentDidMount() {
    try {
      const video = await fetch('media/videos/' + this.props.author + '/' + this.props.filename, {
        method: 'head'
      })
      /*
      const image = await fetch('media/default/background.jpg', {
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
  renderPlayer(loading: boolean, error: boolean) {
    const errorOverlay = this.state.error ? {opacity: 1} : {opacity: 0}
    const Player =  (
      <div>
        <ReactPlayer className="video-player" url={'media/videos/' + this.props.author + '/' + this.props.filename}
          controls={true} pip={true} width="100%" height="auto" playsinline={true}/>
        <div id="video-overlay" style={errorOverlay}>
          <h3>video not found.</h3>
        </div>
      </div>
    )
    return Player
  }
  render() {
    return this.renderPlayer(this.props.loading, this.state.error)
  }
}


export default VideoStream;
