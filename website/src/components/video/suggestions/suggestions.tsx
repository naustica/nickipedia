import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './../video.scss'


class VideoSuggestions extends Component<{id?: number}, {data: Array<string>}> {
  constructor(props:any) {
    super(props)
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    await fetch('api/video?all=True', {
      method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({data: data})
    })
  }
  render() {
    return (
      <div className="card" style={{height: "150px", width: "150px", backgroundColor: "transparent", margin: "1rem", borderRadius: "5px"}}>
        <Link to="/watch/1">
          <img src="" className="card-img-top" alt="..." style={{borderRadius: "5px"}} />
          <div className="card-img-overlay">
            <h5 className="card-title" style={{fontSize: "12px", color: "black"}}>title</h5>
          </div>
        </Link>
      </div>
    )
  }
}


export default VideoSuggestions;
