import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import './../home.scss'
import Loading from './../../loading/loading'
import ConvertTime, { ConvertDurationTime } from './../../../utils/datetime'


class Card extends Component<{result: any, loading}, {maxLength: number, likes: number, comments: number, timestamp: string, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      maxLength: 60,
      likes: 0,
      comments: 0,
      timestamp: null,
      loading: false
    }
    this.computeLikes = this.computeLikes.bind(this)
    this.computeComments = this.computeComments.bind(this)
    this.computeDate = this.computeDate.bind(this)
  }
  computeLikes() {
    var i
    let likes = 0
    for (i=0; i < this.props.result.voting.length; i++) {
      if (this.props.result.voting[i].like === 1) {
        likes++
      }
      this.setState({likes: likes})
    }
  }
  computeComments() {
    var i
    let comments = 0
    for (i=0; i < this.props.result.comments.length; i++) {
        comments++
      }
      this.setState({comments: comments})
  }
  computeDate() {
    let data:any = [{timestamp: this.props.result.timestamp}]
    ConvertTime(data)
    this.setState({timestamp: data[0].timestamp})
  }
  componentDidMount() {
    this.setState({loading: true})
    this.computeLikes()
    this.computeComments()
    this.computeDate()
    this.setState({loading: false})
  }
  render() {
    const checkLengthTitle = this.props.result.title.length > this.state.maxLength ? this.props.result.title.substring(0, this.state.maxLength) + '...' : this.props.result.title
    const loadingState = this.props.loading ? (<div className="col-3"><div className="frontpage-suggestions-card" style={{backgroundColor: "#E0DFDF"}}></div></div>) : (
      <div className="col-3">
      <div className="frontpage-suggestions-card">
        <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
        <div className="frontpage-suggestions-card-img">
          <img className="" src={'media/default/background.jpg'} alt="..." />
          <span className="frontpage-suggestions-card-video-duration">{ConvertDurationTime(this.props.result.duration)}</span>
        </div>
        <div className="frontpage-suggestions-card-body">
          <p className="frontpage-suggestions-card-title">{checkLengthTitle}</p>
          <div className="frontpage-suggestions-card-info">
            <p className="frontpage-suggestions-card-author">{this.props.result.author_id}</p>
            <p className="frontpage-suggestions-card-views">{this.props.result.views + " views" + " • " + this.state.timestamp}</p>
          </div>
        </div>
        </Link>
      </div>
      </div>
    )
    return loadingState
  }
}


export default Card;
