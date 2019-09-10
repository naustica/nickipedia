import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import {IoIosPlay, IoIosPause, IoMdExpand} from 'react-icons/io';
import {IconContext} from "react-icons";


import './../video.scss'

class VideoStream extends Component<{author: string, filename: string, loading: boolean}, {error: boolean, playing: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      error: false,
      playing: true
    }
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.getCurrentVideoProgress = this.getCurrentVideoProgress.bind(this)
  }
  componentDidMount() {
    const video: any  = document.querySelector('video')
    video.addEventListener('timeupdate', this.getCurrentVideoProgress)
  }
  componentWillUnmount() {
    const video: any  = document.querySelector('video')
    video.removeEventListener('timeupdate', this.getCurrentVideoProgress)
  }
  togglePlayPause() {
    const video: any  = document.querySelector('video')
    if (video.paused) {
      this.setState({playing: true})
      video.play()
    } else {
      this.setState({playing: false})
      video.pause()
    }
  }
  getCurrentVideoProgress() {
    const video: any  = document.querySelector('video')
    let timebar: any = document.querySelector('.video-timebar-line')
    let timebarPos = video.currentTime / video.duration
    timebar.style.width = timebarPos * 100 + '%'
    if (video.ended) {
      this.setState({playing: false})
    }
  }
  renderPlayButton() {
    if (this.state.playing === false) {
      return (
        <IconContext.Provider value={{size: "26px"}}>
          <IoIosPlay />
        </IconContext.Provider>
      )
    }
    else {
      return (
        <IconContext.Provider value={{size: "26px"}}>
          <IoIosPause />
        </IconContext.Provider>
      )
    }
  }
  renderPlayer(loading: boolean, error: boolean) {
    const errorOverlay = this.state.error ? {opacity: 1} : {opacity: 0}
    const Player = (
      <div className="video-player-container" onClick={this.togglePlayPause}>
        <ReactPlayer className="video-player" url={'media/videos/' + this.props.author + '/' + this.props.filename}
          controls={false} pip={true} width="100%" height="auto" playsinline={true} playing={this.state.playing}/>
        <div className="video-controls">
          <div className="video-timebar">
            <div className="video-timebar-line"></div>
          </div>
          <div className="video-play">
            <button className="btn" id="video-play-button">
              {this.renderPlayButton()}
            </button>
          </div>
          <div className="video-expand">
            <button className="btn" id="video-expand-button">
            <IconContext.Provider value={{size: "24px"}}>
              <IoMdExpand />
            </IconContext.Provider>
          </button>
          </div>
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
