import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './../video.scss'


class VideoDescription extends Component<{title: string, description: string, author: string}, {}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    return (
      <div className="card" style={{marginTop: "0.5rem", opacity: 0.95, backgroundColor: "#F5F5F5", border: "2px solid #ccc", borderRadius: "5px"}}>
        <div className="card-body">
          <h1 className="card-title" style={{zIndex: 1}}>{this.props.title}</h1>
          <h5 className="card-subtitle"><Link to="/" className="card-link">{this.props.author}</Link></h5>
          <br/>
          <p className="card-text">{this.props.description}</p>
        </div>
      </div>
    )
  }
}


export default VideoDescription;
