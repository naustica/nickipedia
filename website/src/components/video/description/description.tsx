import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {Heart, Trashcan, Thumbsdown, Thumbsup} from '@primer/octicons-react';

import './../video.scss'
import Loading from './../../loading/loading'


class VideoDescription extends Component<{id: number, title: string, description: string, author: string, timestamp: any, views: number}, {likes: number, dislikes: number, userVoting: string, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      likes: 0,
      dislikes: 0,
      userVoting: 'unvoted',
      loading: false
    }
    this.onClickLike = this.onClickLike.bind(this)
    this.onClickDislike = this.onClickDislike.bind(this)
    this.getLikesFromAPI = this.getLikesFromAPI.bind(this)
  }

  async getLikesFromAPI(id) {
    this.setState({loading: true})
    const access_token = sessionStorage.getItem('access_token')
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

  componentDidMount() {
    this.getLikesFromAPI(this.props.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({likes: 0, dislikes: 0, userVoting: 'unvoted'})
      this.getLikesFromAPI(this.props.id)
    }
  }

  onClickLike(event:React.MouseEvent<HTMLButtonElement>): any {
    const access_token = sessionStorage.getItem('access_token')
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

  onClickDislike(event:React.MouseEvent<HTMLButtonElement>): any {
    const access_token = sessionStorage.getItem('access_token')
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

  convertVideoTimestamp(date) {
    let d = new Date(date)
    return d.getDate() + ' ' + d.toLocaleString('default', {month: 'short'}) + ' ' + d.getFullYear()
  }

  render() {
    const videoTimestamp = this.convertVideoTimestamp(this.props.timestamp)
    const upvoteButtonStyle = this.state.userVoting === 'upvoted' ? {color: "#E0235F"} : {color: "black"}
    const downvoteButtonStyle = this.state.userVoting === 'downvoted' ? {color: "#5975CC"} : {color: "black"}
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
      <div className="card" style={{marginTop: "0.5rem", opacity: 0.95, backgroundColor: "#F5F5F5", border: "2px solid #505458", borderRadius: "5px", boxShadow: "1px 1px 0 1px #ccc"}}>
        <div className="card-body">
          <h3 className="card-title">{this.props.title}</h3>
          <p style={{fontSize: "15px", color: "#6D6D6D"}}>{this.props.views + ' views'}</p>
          <hr/>
          <h5 className="card-subtitle"><Link to="/" className="card-link">{this.props.author}</Link></h5>
          <p style={{fontSize: "13px", color: "#757D85"}}>{"published on " +  videoTimestamp}</p>
          <br/>
          <p><a href="/" style={{backgroundColor: "#6871F0", marginRight: "0.5rem", color: "white", padding: "0.3rem", borderRadius: "5px"}}>#kek</a><a href="/" style={{backgroundColor: "#FF2D80", color: "white", padding: "0.3rem", borderRadius: "5px"}}>#lol</a></p>
          <p className="card-text">{this.props.description}</p>
          <button type="button" className="btn" id="btn-upvote" style={upvoteButtonStyle} onClick={this.onClickLike}>
            <Octicon icon={Heart} size="medium" />
            <div>{this.state.likes}</div>
          </button>
          <button type="button" className="btn" id="btn-downvote" style={downvoteButtonStyle} onClick={this.onClickDislike}>
            <Octicon icon={Trashcan} size="medium" />
            <div>{this.state.dislikes}</div>
          </button>
        </div>
      </div>
    )
    return loadingState
  }
}


export default VideoDescription;
