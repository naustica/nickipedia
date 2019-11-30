import React, { Component, ReactNode } from 'react'
import ReactPlayer from 'react-player'
import { IoIosPlay, IoIosPause, IoMdExpand, IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io'
import { IconContext } from 'react-icons'

import { convertPlayTime } from './../../../utils/datetime'

import './../video.scss'


interface Props {
  author: string,
  filename: string,
  loading: boolean
}
interface State {
  error: boolean,
  playing: boolean,
  played: number,
  volume: number,
  loaded: number,
  seeking: boolean,
  duration: number,
  fullscreen: boolean,
  muted: boolean
}

export default class VideoStream extends Component<Props, State> {

  private player: any
  private videoContainer: any

  constructor(props: Props) {
    super(props)
    this.state = {
      error: false,
      playing: true,
      played: 0,
      volume: 1,
      loaded: 0,
      seeking: false,
      duration: 0,
      fullscreen: false,
      muted: false
    }
  }
  private videoRef = (player: any): void => {
    this.player = player
  }
  private videoContainerRef = (videoContainer: any): void => {
    this.videoContainer = videoContainer
  }
  private togglePlayPause = (): void => {
    this.setState({playing: !this.state.playing})
  }
  private getCurrentVideoProgress = (state): void => {
    this.setState(state)
  }
  private videoEnded = (): void => {
    this.setState({playing: false})
  }
  private seekVideo = (event: { target: { value: string } }): void => {
    this.setState({played: parseFloat(event.target.value)})
    this.player.seekTo(parseFloat(event.target.value))
  }
  private changeVolume = (event: { target: { value: string } }): void => {
    this.setState({volume: parseFloat(event.target.value)})
  }
  private handleDuration = (duration: any): void => {
    this.setState({duration})
  }
  private getFullscreen = (): void => {
    if (this.state.fullscreen) {
      if (document.fullscreen) {
        document.exitFullscreen()
        this.setState({fullscreen: false})
      }
    }
    else {
      this.videoContainer.requestFullscreen()
      this.setState({fullscreen: true})
    }
  }
  private handleKeyDown = (event: any): void => {
    // enter
    if (event.keyCode === 32) {
      event.preventDefault()
      this.togglePlayPause()
    }
    // f
    if (event.keyCode === 70) {
      event.preventDefault()
      this.getFullscreen()
    }
    // arrow up
    if (event.keyCode === 38) {
      event.preventDefault()
    }
    // arrow down
    if (event.keyCode === 40) {
      event.preventDefault()
    }
    // arrow left
    if (event.keyCode === 37) {
      event.preventDefault()
    }
    // arrow right
    if (event.keyCode === 39) {
      event.preventDefault()
    }
  }
  private toggleMuted = (): void => {
    this.setState({muted: !this.state.muted})
  }
  private renderPlayButton = (): ReactNode => {
    if (this.state.playing) {
      return (
        <IconContext.Provider value={{size: "25px"}}>
          <IoIosPause />
        </IconContext.Provider>
      )
    }
    else {
      return (
        <IconContext.Provider value={{size: "25px"}}>
          <IoIosPlay />
        </IconContext.Provider>
      )
    }
  }
  private renderVolumeButton = (): ReactNode => {
    if (this.state.muted || this.state.volume === 0) {
      return (
        <IconContext.Provider value={{size: "25px"}}>
          <IoMdVolumeOff />
        </IconContext.Provider>
      )
    }
    else {
      return (
        <IconContext.Provider value={{size: "25px"}}>
          <IoMdVolumeHigh />
        </IconContext.Provider>
      )
    }
  }
  private renderPlayer = (loading: boolean, error: boolean): ReactNode => {
    const errorOverlay = this.state.error ? {opacity: 1} : {opacity: 0}
    const showVideoControls = this.state.playing ? {} : {opacity: 1}
    const Player = (
      <div className="video-player-container" ref={this.videoContainerRef} onKeyDown={this.handleKeyDown} tabIndex={1}>
        <div onClick={this.togglePlayPause}>
          <ReactPlayer className="video-player" url={'media/videos/' + this.props.author + '/' + this.props.filename}
            controls={false} pip={false} width="100%" height="auto"
            playing={this.state.playing} onProgress={this.getCurrentVideoProgress} volume={this.state.volume}
            muted={this.state.muted} onEnded={this.videoEnded} ref={this.videoRef} onDuration={this.handleDuration}
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
            <button className="video-play-button" onClick={this.togglePlayPause}>
              {this.renderPlayButton()}
            </button>
          </div>
          <div className="video-audio">
            <button className="video-audio-button" onClick={this.toggleMuted}>
              {this.renderVolumeButton()}
            </button>
            <span className="video-audio-line">
              <span className="video-audio-fill" style={{width: this.state.volume * 100 + "%"}}></span>
            </span>
            <input className="video-audio-volume" type="range" min={0} max={1}
              value={this.state.volume} step="any" onChange={this.changeVolume}
            />
          </div>
          <div className="video-play-time">
            {convertPlayTime(this.state.duration * this.state.played)} / {convertPlayTime(this.state.duration)}
          </div>
          <div className="video-expand">
            <button className="video-expand-button" onClick={this.getFullscreen}>
              <IconContext.Provider value={{size: "25px"}}>
                <IoMdExpand />
              </IconContext.Provider>
            </button>
          </div>
        </div>
      </div>
    )
    if (loading) {
      return <div className="video-player-container--loading" />
    }
    return Player
  }
  public render = (): ReactNode => {
    return this.renderPlayer(this.props.loading, this.state.error)
  }
}
