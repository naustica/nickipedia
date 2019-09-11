import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import {IoIosPlay, IoIosPause, IoMdExpand} from 'react-icons/io';
import {IconContext} from "react-icons";


import './../video.scss'

class VideoStream extends Component<{author: string, filename: string, loading: boolean}, {error: boolean, playing: boolean, played: number, volume: number, loaded: number, seeking: boolean, duration: number}> {
  player: any
  constructor(props:any) {
    super(props)
    this.state = {
      error: false,
      playing: true,
      played: 0,
      volume: 1,
      loaded: 0,
      seeking: false,
      duration: 0
    }
  }
  ref = player => {
    this.player = player
  }
  togglePlayPause = () => {
    this.setState({playing: !this.state.playing})
  }
  getCurrentVideoProgress = (state) => {
    this.setState(state)
  }
  videoEnded = () => {
    this.setState({playing: false})
  }
  seekVideo = (event) => {
    this.setState({played: parseFloat(event.target.value)})
    this.player.seekTo(parseFloat(event.target.value))
  }
  handleDuration = (duration) => {
    this.setState({duration})
  }
  renderPlayButton = () => {
    if (this.state.playing) {
      return (
        <IconContext.Provider value={{size: "26px"}}>
          <IoIosPause />
        </IconContext.Provider>
      )
    }
    else {
      return (
        <IconContext.Provider value={{size: "26px"}}>
          <IoIosPlay />
        </IconContext.Provider>
      )
    }
  }
  renderPlayer = (loading: boolean, error: boolean) => {
    const errorOverlay = this.state.error ? {opacity: 1} : {opacity: 0}
    const Player = (
      <div className="video-player-container">
        <div onClick={this.togglePlayPause}>
          <ReactPlayer className="video-player" url={'media/videos/' + this.props.author + '/' + this.props.filename}
            controls={false} pip={true} width="100%" height="auto"
            playing={this.state.playing} onProgress={this.getCurrentVideoProgress}
            onEnded={this.videoEnded} ref={this.ref} onDuration={this.handleDuration}
          />
        </div>
        <div className="video-controls">
          <div className="video-timebar">
            <input className="video-timebar-progress" type="range" min={0} max={1}
              value={this.state.played} step="any" onChange={this.seekVideo}
            />
          </div>
          <div className="video-play">
            <button className="btn" id="video-play-button" onClick={this.togglePlayPause}>
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
