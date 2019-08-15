import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './../video.scss';
import Loading from './../../loading/loading';


class VideoSuggestions extends Component<{suggestions: any, loading: boolean},{}> {
  constructor(props:any) {
    super(props)
  }
  renderSuggestionsCards(loading) {
    const content = loading ? this.props.suggestions.map(suggestion => (
      <div className="card" key={suggestion.id} style={{height: "10rem", width: "14rem", backgroundColor: "#E0DFDF", margin: "1rem", marginBottom: "2rem"}}>
      </div>
    )) : (
      this.props.suggestions.slice(0, 6).map(suggestion => (
        <div className="card" key={suggestion.id} style={{height: "10rem", width: "14rem", backgroundColor: "transparent", margin: "1rem", marginBottom: "2rem"}}>
          <Link to={"/watch/" + suggestion.id}>
            <img src="http://0.0.0.0:8000/default/default_thumbnail.jpg" className="card-img-top" alt="..." style={{borderRadius: "5px"}} />
            <div className="card-img-overlay">
              <h5 className="card-title" style={{fontSize: "12px", color: "black"}}>{suggestion.title}</h5>
            </div>
          </Link>
        </div>
      ))
    )
    return content
  }
  render() {
    return this.renderSuggestionsCards(this.props.loading)
  }
}


export default VideoSuggestions;
