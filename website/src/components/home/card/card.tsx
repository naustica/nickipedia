import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {Heart, CommentDiscussion} from '@primer/octicons-react';

import './../home.scss'


class Card extends Component<{result: any}, {}> {
  constructor(props:any) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div className="card" id="front-page-suggestions">
        <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
          <img className="card-img-top" src="http://0.0.0.0:8000/default/default_thumbnail.jpg" style={{objectFit: "cover"}} alt="..." />
          <div className="card-body" style={{borderTop: "2px solid #505458", padding: "0.1rem"}}>
            <p className="card-text" style={{textAlign: "left", fontSize: "13px", fontWeight: 500, position: "relative", margin: 0}}>{this.props.result.title}</p>
            <div style={{margin: 0, paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0, position: "absolute", bottom: 0}}>
              <div style={{color: "red", display:"inline", paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0}}>
                <Octicon icon={Heart} size="small" />
              </div>
              <div style={{display:"inline"}}>
                2
              </div>
              <div style={{color: "#88AEDC", display:"inline", paddingLeft: "0.5rem", paddingTop: 0, paddingRight: "0.5rem", paddingBottom: 0}}>
                <Octicon icon={CommentDiscussion} size="small" />
              </div>
              <div style={{display:"inline"}}>
                3
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
  }
}


export default Card;
