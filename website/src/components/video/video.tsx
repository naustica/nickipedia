import React, {Component} from 'react';

import './video.scss'

import VideoStream from './stream/stream';
import VideoDescription from './description/description';
import VideoComments from './comments/comments';
import VideoSuggestions from './suggestions/suggestions';
import Loading from './../loading/loading';


class Video extends Component<{match?: any}, {title: string, description: string, author: string, filename: string, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      title: '',
      description: '',
      author: '',
      filename: '',
      loading: true
    }
  }
  componentDidMount() {
    const {id} = this.props.match.params
    fetch('api/video?video_id=' + id, {
      method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({title: data.title, description: data.text, author: data.author_id, filename: data.filename})
      this.setState({loading: false})
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    const {id} = this.props.match.params
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <VideoStream author={this.state.author} filename={this.state.filename} />
            <VideoDescription title={this.state.title} description={this.state.description} author={this.state.author} id={id} />
          </div>
          <div className="col-sm-3" style={{backgroundColor: "transparent", opacity: 0.95}}>
            <VideoSuggestions id={id}/>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <VideoComments id={id}/>
          </div>
        </div>
      </div>
    )
    return loadingState
  }
}


export default Video;
