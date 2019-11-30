import React, { Component, ReactNode } from 'react'
import {Link} from 'react-router-dom'
import { IoMdHeart, IoMdHeartEmpty, IoMdTrash } from 'react-icons/io'
import { IconContext } from 'react-icons'

import './../video.scss'
import Loading from './../../loading/loading'


interface Props {
  id: number,
  title: string,
  description: string,
  author: string,
  timestamp: any,
  views: number,
  loading: boolean
}

interface State {
  likes: number,
  dislikes: number,
  userVoting: string,
  loading: boolean
}

export default class VideoDescription extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      likes: 0,
      dislikes: 0,
      userVoting: 'unvoted',
      loading: false
    }
  }

  private getLikesFromAPI = async (id: number): Promise<void> => {
    this.setState({loading: true})
    const access_token = localStorage.getItem('access_token')
    await fetch('api/likes?v=' + id, {
      method: 'get',
    })
    .then ((response => {
      const status = response.status
      const data = response.json()
      return Promise.all([status, data])
    }))
    .then(([status, data]) => {
      this.setState({likes: data.likes, dislikes: data.dislikes})
    })
    .catch(error => {
      console.log(error)
    })

    fetch('api/likes/user?v=' + id, {
      method: 'get',
      headers: new Headers({
        "Authorization": access_token
      })
    })
    .then ((response => {
      const status = response.status
      const data = response.json()
      return Promise.all([status, data])
    }))
    .then(([status, data]) => {
      if (data.like === 0 && data.dislike === 0) {
        this.setState({userVoting: 'unvoted'})
      }
      if (data.like === 1) {
        this.setState({userVoting: 'upvoted'})
      }
      if (data.dislike === 1) {
        this.setState({userVoting: 'downvoted'})
      }
    })
    .catch(error => {
      console.log(error)
    })
    this.setState({loading: false})
  }

  public componentDidMount = (): void => {
    this.getLikesFromAPI(this.props.id)
  }

  public componentDidUpdate = (prevProps: Props): void => {
    if (this.props.id !== prevProps.id) {
      this.setState({likes: 0, dislikes: 0, userVoting: 'unvoted'})
      this.getLikesFromAPI(this.props.id)
    }
  }

  private onClickLike = (event:React.MouseEvent<HTMLButtonElement>): any => {
    const access_token = localStorage.getItem('access_token')
    let likes = this.state.likes
    let dislikes = this.state.dislikes

    switch (true) {

      case this.state.userVoting === 'upvoted':
        this.setState({likes: likes - 1, userVoting: 'unvoted'})
        fetch('api/likes', {
          method: 'post',
          headers: {'Content-Type': 'application/json', "Authorization": access_token,},
          body: JSON.stringify({like: 0, dislike: 0, video_id: this.props.id})
        })
        break

      case this.state.userVoting === 'downvoted':
        this.setState({likes: likes + 1, dislikes: dislikes - 1, userVoting: 'upvoted'})
        fetch('api/likes', {
          method: 'post',
          headers: {'Content-Type': 'application/json', "Authorization": access_token,},
          body: JSON.stringify({like: 1, dislike: 0, video_id: this.props.id})
        })
        break

      case this.state.userVoting === 'unvoted':
        this.setState({likes: likes + 1, userVoting: 'upvoted'})
        fetch('api/likes', {
          method: 'post',
          headers: {'Content-Type': 'application/json', "Authorization": access_token,},
          body: JSON.stringify({like: 1, dislike: 0, video_id: this.props.id})
        })
        break
    }
  }

  private onClickDislike = (event:React.MouseEvent<HTMLButtonElement>): any => {
    const access_token = localStorage.getItem('access_token')
    let likes = this.state.likes
    let dislikes = this.state.dislikes

    switch (true) {

      case this.state.userVoting === 'downvoted':
        this.setState({dislikes: dislikes - 1, userVoting: 'unvoted'})
        fetch('api/likes', {
          method: 'post',
          headers: {'Content-Type': 'application/json', "Authorization": access_token,},
          body: JSON.stringify({like: 0, dislike: 0, video_id: this.props.id})
        })
        break

      case this.state.userVoting === 'upvoted':
        this.setState({likes: likes - 1, dislikes: dislikes + 1, userVoting: 'downvoted'})
        fetch('api/likes', {
          method: 'post',
          headers: {'Content-Type': 'application/json', "Authorization": access_token,},
          body: JSON.stringify({like: 0, dislike: 1, video_id: this.props.id})
        })
        break

      case this.state.userVoting === 'unvoted':
        this.setState({dislikes: dislikes + 1, userVoting: 'downvoted'})
        fetch('api/likes', {
          method: 'post',
          headers: {'Content-Type': 'application/json', "Authorization": access_token,},
          body: JSON.stringify({like: 0, dislike: 1, video_id: this.props.id})
        })
        break
    }
  }

  private convertVideoTimestamp = (date: any): any => {
    let d = new Date(date)
    return d.getDate() + ' ' + d.toLocaleString('default', {month: 'short'}) + ' ' + d.getFullYear()
  }

  private renderLikeButton = (): ReactNode => {
    if (this.state.userVoting === "upvoted") {
      return (
        <IconContext.Provider value={{size: "28px"}}>
          <IoMdHeart />
        </IconContext.Provider>
      )
    }
    else {
      return (
        <IconContext.Provider value={{size: "28px"}}>
          <IoMdHeartEmpty />
        </IconContext.Provider>
      )
    }
  }

  private renderDislikeButton = (): ReactNode => {
    return (
      <IconContext.Provider value={{size: "28px"}}>
        <IoMdTrash />
      </IconContext.Provider>
    )
  }

  private renderTextDescription = (): ReactNode => {
    if (!this.props.loading) {
      if (this.props.description.length === 0 || this.props.description.length === 1) {
        return (
          <span style={{color: "#6D6D6D"}}>No Description available.</span>
        )
      }
      else {
        return (
          this.props.description
        )
      }
    }
  }

  public render = (): ReactNode => {
    const videoTimestamp = this.convertVideoTimestamp(this.props.timestamp)
    const upvoteButtonStyle = this.state.userVoting === 'upvoted' ? {color: "#E0235F"} : {color: "#262626"}
    const downvoteButtonStyle = this.state.userVoting === 'downvoted' ? {color: "#5975CC"} : {color: "#262626"}
    const Description = (
      <div className="video-description">
        <h2 className="video-description-title">{this.props.title}</h2>
        <p className="video-description-views">{this.props.views + ' views' + ' • ' + videoTimestamp}</p>
        <hr/>
        <div className="video-description-infobox">
          <div className="video-description-infobox-img">
            <img src="media/default/default_pic_a.jpg" className="" />
          </div>
          <div className="video-description-infobox-text">
            <h4 className="video-description-author"><Link to="/" className="card-link">{this.props.author}</Link></h4>
            <p className="video-description-subscribers">{"0 subscribers"}</p>
            <p className="video-description-text">{this.renderTextDescription()}</p>
          </div>
        </div>
        <button type="button" className="upvote-button" style={upvoteButtonStyle} onClick={this.onClickLike}>
          {this.renderLikeButton()}
          <span>{this.state.likes}</span>
        </button>
        <button type="button" className="downvote-button" style={downvoteButtonStyle} onClick={this.onClickDislike}>
          {this.renderDislikeButton()}
          <span>{this.state.dislikes}</span>
        </button>
        <hr/>
      </div>
    )
    if (this.props.loading) {
      return <div className="video-description--loading" />
    }
    return Description
  }
}
