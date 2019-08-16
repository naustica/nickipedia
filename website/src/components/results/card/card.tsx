import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {TriangleRight} from '@primer/octicons-react';

import './../results.scss';
import ConvertTime from './../../../utils/datetime';


class Card extends Component<{result:any, fetching: boolean}, {maxLength: number, likes: number, comments: number, timestamp: any, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      maxLength: 200,
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
    const checkLengthDescription = this.props.result.text.length > this.state.maxLength ? this.props.result.text.substring(0, this.state.maxLength) + '...' : this.props.result.text
    const loadingStyles = this.props.fetching ? {backgroundColor: "#E0DFDF", color: "transparent", boxShadow: "none", border: "none"} : {}
    return (
        <div className="card mb-2" id="result-card">
          <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
            <div className="col-3">
              <img src="http://0.0.0.0:8000/default/default_thumbnail.jpg" className="card-img-top" id="card-img-result" alt="..." />
              <div className="card-img-overlay" id="result-play-button">
                <Octicon icon={TriangleRight} size="medium"/>
              </div>
            </div>
            <div className="col-9">
              <div className="card-body">
                <h6 className="card-title" style={{marginBottom: "0.5rem", fontSize: "16px"}}>{this.props.result.title}</h6>
                <p style={{fontSize: "12px", color: "#6D6D6D", marginBottom: "0.5rem"}}>{this.props.result.author_id} • {this.props.result.views + ' views'} • {this.state.timestamp}</p>
                <p className="card-text" style={{fontSize: "12px"}}>{checkLengthDescription}</p>
              </div>
            </div>
          </Link>
        </div>
  )
  }
}


export default Card;
