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
      <div className="card" key={suggestion.id} style={{height: "110px", width: "100%", backgroundColor: "#E0DFDF", marginBottom: "1rem"}}>
      </div>
    )) : (
      this.props.suggestions.slice(0, 14).map(suggestion => (
        <div className="video-suggestion-card" key={suggestion.id}>
          <Link to={"/watch/" + suggestion.id}>
            <div className="video-suggestion-pic">
              <img src="media/default/default_thumbnail.jpg" className="" alt="..."/>
            </div>
            <div className="video-suggestion-body">
              <h5 className="video-suggestion-title">{suggestion.title}</h5>
              <h6 className="video-suggestion-author">{suggestion.author_id}</h6>
              <p className="video-suggestion-views">{suggestion.views + " views"}</p>
            </div>
          </Link>
        </div>
      ))
    )
    return content
  }
  render() {
    console.log(this.props.suggestions)
    return this.renderSuggestionsCards(this.props.loading)
  }
}


export default VideoSuggestions;
