import React, {Component} from 'react';

import './video.scss'

import VideoStream from './stream/stream';
import VideoDescription from './description/description';
import VideoComments from './comments/comments';
import VideoSuggestions from './suggestions/suggestions';
import Loading from './../loading/loading';


class Video extends Component<{match?: any}, {id: number, title: string, description: string, author: string, timestamp: any, filename: string, views: number, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      id : 0,
      title: '',
      description: '',
      author: '',
      filename: '',
      timestamp: '',
      views: 0,
      loading: true
    }
    this.getVideoData = this.getVideoData.bind(this)
  }
  getVideoData(id) {
    fetch('api/video?video_id=' + id, {
      method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({id: id, title: data.title, description: data.text, author: data.author_id, filename: data.filename, timestamp: data.timestamp, views: data.views})
      this.updateViewCounter(id)
      this.setState({loading: false})
    })
    .catch(error => {
      console.log(error)
    })
  }
  updateViewCounter(id) {
    const access_token = sessionStorage.getItem('access_token')
    fetch('api/video?video_id=' + id, {
      method: 'put',
      headers: new Headers({
        "Authorization": access_token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({views: this.state.views +1})
    })
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.getVideoData(id)
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id
      this.getVideoData(id)
    }
  }
  render() {
    const loadingState = this.state.loading ? (<Loading loading={this.state.loading}/>) : (
      <div className="container" style={{padding: "2rem"}}>
        <div className="row">
          <div className="col-sm-9">
            <VideoStream author={this.state.author} filename={this.state.filename} />
            <VideoDescription title={this.state.title} description={this.state.description} author={this.state.author} timestamp={this.state.timestamp} views={this.state.views} id={this.state.id} />
          </div>
          <div className="col-sm-3" style={{backgroundColor: "transparent", opacity: 0.95}}>
            <VideoSuggestions id={this.state.id}/>
          </div>
        </div>
        <div className="row">
          <div className="container" style={{padding: "2rem"}}>
            <VideoComments id={this.state.id}/>
          </div>
        </div>
      </div>
    )
    return loadingState
  }
}


export default Video;
