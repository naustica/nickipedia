import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {Heart, CommentDiscussion} from '@primer/octicons-react';

import './../home.scss';
import Loading from './../../loading/loading';
import ConvertTime from './../../../utils/datetime';


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
    const loadingState = this.props.loading ? (<div className="col-3"><div className="card" id="front-page-suggestions" style={{backgroundColor: "#E0DFDF"}}></div></div>) : (
      <div className="col-3">
      <div className="card" id="front-page-suggestions">
        <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
        <div style={{height: "100%", position: "absolute", margin: "0.1rem"}}>
          <img className="card-img-top" src="media/default/background.jpg" style={{objectFit: "cover", height: "50%"}} alt="..." />
          <div className="card-body" style={{borderTop: "1px solid #505458", padding: "0.1rem", paddingTop: "0.8rem"}}>
            <p className="card-text" style={{textAlign: "left", fontSize: "14px", fontWeight: 500, position: "relative", margin: 0, height: "auto"}}>{checkLengthTitle}</p>
            <p className="card-text" style={{textAlign: "left", fontSize: "13px", fontWeight: 400, color: "#6D6D6D", position: "relative", height: "auto", paddingTop: "0.5rem", marginBottom: 0}}>{this.props.result.author_id}</p>
            <p className="card-text" style={{textAlign: "left", fontSize: "13px", fontWeight: 400, color: "#6D6D6D", position: "relative", height: "auto", paddingTop: "0.2rem"}}>{this.props.result.views + " views" + " • " + this.state.timestamp}</p>
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
