import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Octicon, {TriangleRight} from '@primer/octicons-react';

import './../results.scss'


class Card extends Component<{result:any}, {maxLength: number}> {
  constructor(props:any) {
    super(props)
    this.state = {
      maxLength: 200
    }
  }
  render() {
    const checkLengthDescription = this.props.result.properties.text.length > this.state.maxLength ? this.props.result.properties.text.substring(0, this.state.maxLength) + '...' : this.props.result.properties.text
    return (
        <div className="card mb-2" id="result-card">
          <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src="http://0.0.0.0:8000/default/default_thumbnail.jpg" className="card-img-top" id="card-img-result" alt="..." />
              <div className="card-img-overlay" id="result-play-button">
                <Octicon icon={TriangleRight} size="medium"/>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <h5 className="card-title" style={{}}>{this.props.result.properties.title}</h5>
                <p className="card-text" style={{fontSize: "12px"}}>{checkLengthDescription}</p>
              </div>
            </div>
          </div>
          </Link>
        </div>
  )
  }
}


export default Card;
