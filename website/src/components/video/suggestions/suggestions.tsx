import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './../video.scss'


class VideoSuggestions extends Component<{id?: number}, {data: Array<any>}> {
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
      const newData = this.state.data.filter(item => item.id !== Number(this.props.id))
      this.setState({data: newData})
    })
  }
  render() {
    const suggestionsCards= (this.state.data.slice(0, 3).map(suggestion => (
      <div className="card" key={suggestion.id} style={{height: "10rem", width: "14rem", backgroundColor: "transparent", margin: "1rem", marginBottom: "2rem", borderRadius: "5px"}}>
        <Link to={"/watch/" + suggestion.id}>
          <img src="http://0.0.0.0:8000/default/default_thumbnail.jpg" className="card-img-top" alt="..." style={{borderRadius: "5px"}} />
          <div className="card-img-overlay">
            <h5 className="card-title" style={{fontSize: "12px", color: "black"}}>{suggestion.title}</h5>
          </div>
        </Link>
      </div>
    )))
    return suggestionsCards
  }
}


export default VideoSuggestions;
