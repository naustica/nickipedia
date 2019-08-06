import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {Heart, Trashcan, Thumbsdown, Thumbsup} from '@primer/octicons-react';

import './../video.scss'


class VideoDescription extends Component<{id: number, title: string, description: string, author: string}, {likes: number, dislikes: number, userVoting: string}> {
  constructor(props:any) {
    super(props)
    this.state = {
      likes: 0,
      dislikes: 0,
      userVoting: 'unvoted'
    }
    this.onClickLike = this.onClickLike.bind(this)
    this.onClickDislike = this.onClickDislike.bind(this)
  }
  componentDidMount() {
    const access_token = sessionStorage.getItem('access_token')
    fetch('api/likes?v=' + this.props.id, {
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
    fetch('api/likes/user?v=' + this.props.id, {
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
      if (status === 404) {
        fetch('api/likes', {
          method: 'post',
          headers: new Headers({
            "Authorization": access_token,
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({video_id: this.props.id})
        })
        .then ((response => {
          const status = response.status
          const data = response.json()
          return Promise.all([status, data])
        }))
        .then(([status, data]) => {
          this.setState({userVoting: 'unvoted'})
        })
        .catch(error => {
          console.log(error)
        })
      }
      else {
        if (data.like === 1) {
          this.setState({userVoting: 'upvoted'})
        }
        if (data.dislike === 1) {
          this.setState({userVoting: 'downvoted'})
        }
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  onClickLike(event:React.MouseEvent<HTMLButtonElement>): any {
    const access_token = sessionStorage.getItem('access_token')
    let likes = this.state.likes
    let dislikes = this.state.dislikes
    if (this.state.userVoting === 'upvoted') {
      this.setState({likes: likes - 1, userVoting: 'unvoted'})
      fetch('api/likes?v=' + this.props.id, {
        method: 'put',
        headers: {'Content-Type': 'application/json', "Authorization": access_token,},
        body: JSON.stringify({like: 0, dislike: 0})
      })
    }
    if (this.state.userVoting === 'downvoted') {
      this.setState({likes: likes + 1, dislikes: dislikes - 1, userVoting: 'upvoted'})
      fetch('api/likes?v=' + this.props.id, {
        method: 'put',
        headers: {'Content-Type': 'application/json', "Authorization": access_token,},
        body: JSON.stringify({like: 1, dislike: 0})
      })
    }
    if (this.state.userVoting === 'unvoted') {
      this.setState({likes: likes + 1, userVoting: 'upvoted'})
      fetch('api/likes?v=' + this.props.id, {
        method: 'put',
        headers: {'Content-Type': 'application/json', "Authorization": access_token,},
        body: JSON.stringify({like: 1, dislike: 0})
      })
    }

  }
  onClickDislike(event:React.MouseEvent<HTMLButtonElement>): any {
    const access_token = sessionStorage.getItem('access_token')
    let likes = this.state.likes
    let dislikes = this.state.dislikes
    if (this.state.userVoting === 'downvoted') {
      this.setState({dislikes: dislikes - 1, userVoting: 'unvoted'})
      fetch('api/likes?v=' + this.props.id, {
        method: 'put',
        headers: {'Content-Type': 'application/json', "Authorization": access_token,},
        body: JSON.stringify({like: 0, dislike: 0})
      })
    }
    if (this.state.userVoting === 'upvoted') {
      this.setState({likes: likes - 1, dislikes: dislikes + 1, userVoting: 'downvoted'})
      fetch('api/likes?v=' + this.props.id, {
        method: 'put',
        headers: {'Content-Type': 'application/json', "Authorization": access_token,},
        body: JSON.stringify({like: 0, dislike: 1})
      })
    }
    if (this.state.userVoting === 'unvoted') {
      this.setState({dislikes: dislikes + 1, userVoting: 'downvoted'})
      fetch('api/likes?v=' + this.props.id, {
        method: 'put',
        headers: {'Content-Type': 'application/json', "Authorization": access_token,},
        body: JSON.stringify({like: 0, dislike: 1})
      })
    }
  }
  render() {
    return (
      <div className="card" style={{marginTop: "0.5rem", opacity: 0.95, backgroundColor: "#F5F5F5", border: "2px solid #505458", borderRadius: "5px"}}>
        <div className="card-body">
          <h1 className="card-title" style={{zIndex: 1}}>{this.props.title}</h1>
          <h5 className="card-subtitle"><Link to="/" className="card-link">{this.props.author}</Link></h5>
          <br/>
          <p className="card-text">{this.props.description}</p>
          <button type="button" className="btn" id="btn-upvote" style={{marginRight: "1.5rem", border: "none"}} onClick={this.onClickLike}>
            <Octicon icon={Heart} size="medium" />
            <div>{this.state.likes}</div>
          </button>
          <button type="button" className="btn" id="btn-downvote" style={{marginRight: "1.5rem", border: "none"}} onClick={this.onClickDislike}>
            <Octicon icon={Trashcan} size="medium" />
            <div>{this.state.dislikes}</div>
          </button>
        </div>
      </div>
    )
  }
}


export default VideoDescription;
