import React, {Component} from 'react';
import ReactPlayer from 'react-player';
import { IoIosPlay, IoIosPause, IoMdExpand, IoMdVolumeHigh } from 'react-icons/io';
import { IconContext } from "react-icons";

import {ConvertPlayTime} from './../../../utils/datetime';

import './../video.scss';


interface ReadOnly {
  author: string,
  filename: string,
  loading: boolean
}
interface WriteOnly {
  error: boolean,
  playing: boolean,
  played: number,
  volume: number,
  loaded: number,
  seeking: boolean,
  duration: number,
  fullscreen: boolean
}

class VideoStream extends Component<ReadOnly, WriteOnly> {

  player: any
  videoContainer: any

  constructor(props:any) {
    super(props)
    this.state = {
      error: false,
      playing: true,
      played: 0,
      volume: 1,
      loaded: 0,
      seeking: false,
      duration: 0,
      fullscreen: false
    }
  }
  videoRef = (player: any) => {
    this.player = player
  }
  videoContainerRef = (videoContainer: any) => {
    this.videoContainer = videoContainer
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
  seekVideo = (event: { target: { value: string } }) => {
    this.setState({played: parseFloat(event.target.value)})
    this.player.seekTo(parseFloat(event.target.value))
  }
  handleDuration = (duration: any) => {
    this.setState({duration})
  }
  getFullscreen = () => {
    this.videoContainer.requestFullscreen()
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
    const showVideoControls = this.state.playing ? {} : {opacity: 1}
    const Player = (
      <div className="video-player-container" ref={this.videoContainerRef}>
        <div onClick={this.togglePlayPause}>
          <ReactPlayer className="video-player" url={'media/videos/' + this.props.author + '/' + this.props.filename}
            controls={false} pip={false} width="100%" height="auto"
            playing={this.state.playing} onProgress={this.getCurrentVideoProgress}
            onEnded={this.videoEnded} ref={this.videoRef} onDuration={this.handleDuration}
          />
        </div>
        <div className="video-controls" style={showVideoControls}>
          <div className="video-timebar">
            <span className="video-timebar-line">
              <span className="video-timebar-loaded" style={{width: this.state.loaded * 100 + "%"}}></span>
              <span className="video-timebar-fill" style={{width: this.state.played * 100 + "%"}}></span>
            </span>
            <input className="video-timebar-progress" type="range" min={0} max={1}
              value={this.state.played} step="any" onChange={this.seekVideo}
            />
          </div>
          <div className="video-play">
            <button className="btn" id="video-play-button" onClick={this.togglePlayPause}>
              {this.renderPlayButton()}
            </button>
          </div>
          <div className="video-audio">
            <button className="btn" id="video-audio-button">
              <IconContext.Provider value={{size: "26px"}}>
                <IoMdVolumeHigh />
              </IconContext.Provider>
            </button>
          </div>
          <div className="video-play-time">
            {ConvertPlayTime(this.state.played * 100)} / {ConvertPlayTime(this.state.duration)}
          </div>
          <div className="video-expand">
            <button className="btn" id="video-expand-button" onClick={this.getFullscreen}>
              <IconContext.Provider value={{size: "26px"}}>
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
