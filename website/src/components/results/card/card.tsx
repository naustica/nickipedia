import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './../results.scss'


class Card extends Component<{result:any}, {}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    return (
        <div className="card mb-2" id="result-card">
          <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src="http://0.0.0.0:8000/default/default_pic_a.jpg" className="card-img-top" id="card-img-result" alt="..." />
            </div>
            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">{this.props.result.properties.title}</h5>
                <p className="card-text">{this.props.result.properties.text}</p>
              </div>
            </div>
          </div>
          </Link>
        </div>
  )
  }
}


export default Card;
