import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {Heart, CommentDiscussion} from '@primer/octicons-react';

import './../home.scss';
import Loading from './../../loading/loading';
import ConvertTime from './../../../utils/datetime';


class Card extends Component<{result: any}, {likes: number, comments: number, timestamp: string, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
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
    const loadingState = this.state.loading ? (<div className="card" id="front-page-suggestions"><Loading loading={this.state.loading}/></div>) : (
      <div className="card" id="front-page-suggestions">
        <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
        <div style={{height: "100%", position: "absolute"}}>
          <img className="card-img-top" src="http://0.0.0.0:8000/default/default_thumbnail.jpg" style={{objectFit: "cover"}} alt="..." />
          <div className="card-body" style={{borderTop: "2px solid #505458", padding: "0.1rem"}}>
            <p className="card-text" style={{textAlign: "left", fontSize: "13px", fontWeight: 500, position: "relative", margin: 0}}>{this.props.result.title}</p>
            <div style={{margin: 0, paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0, position: "absolute", bottom: 0, left: 0}}>
              <div style={{color: "#E0235F", display:"inline", paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0}}>
                <Octicon icon={Heart} size="small" />
              </div>
              <div style={{display:"inline"}}>
                {this.state.likes}
              </div>
              <div style={{color: "#88AEDC", display:"inline", paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0}}>
                <Octicon icon={CommentDiscussion} size="small" />
              </div>
              <div style={{display:"inline"}}>
                {this.state.comments}
              </div>
            </div>
            <div style={{margin: 0, paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0, position: "absolute", bottom: 0, right: 0}}>
              <div style={{display:"inline", color: "#757D85", fontSize: "13px"}}>
                {this.state.timestamp}
              </div>
            </div>
          </div>
          </div>
        </Link>
      </div>
    )
    return loadingState
  }
}


export default Card;
