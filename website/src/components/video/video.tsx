import React, {Component} from 'react';
import {connect} from 'react-redux';

import './video.scss';
import {fetchVideo, fetchVideoStart, addView, getVideoSuggestions, getVideoSuggestionsStart} from './../../store/actions/videoActions';

import VideoStream from './stream/stream';
import VideoDescription from './description/description';
import VideoComments from './comments/comments';
import VideoSuggestions from './suggestions/suggestions';
import Loading from './../loading/loading';


@(connect((store: any) => {
  return {
    video: store.video
  }
}) as any)
class Video extends Component<{match?: any, dispatch?: any, video?: any}, {}> {
  constructor(props:any) {
    super(props)
    this.props.video.fetching = true
    this.props.video.changing = true
  }
  componentWillMount() {
    window.scrollTo(0, 0)
    const id = this.props.match.params.id
    this.getVideoData(id)
  }
  getVideoData(id: number) {
    Promise.all([
      this.props.dispatch(fetchVideoStart()),
      this.props.dispatch(getVideoSuggestionsStart()),
      this.props.dispatch(fetchVideo(id))
    ]).then(() => {
      this.props.dispatch(addView(id, this.props.video.data.views))
      this.props.dispatch(getVideoSuggestions(id, 12))
    })
  }
  componentDidUpdate(prevProps: any) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      window.scrollTo(0, 0)
      const id = this.props.match.params.id
      this.getVideoData(id)
    }
  }
  render() {
    return (
      <div className="container" style={{padding: "1.5rem", paddingLeft: "0.2rem", paddingRight: "0.5rem"}}>
        <div className="row">
          <div className="col-8">
            <VideoStream author={this.props.video.data.author_id} filename={this.props.video.data.filename} loading={this.props.video.changing}/>
            <VideoDescription title={this.props.video.data.title}
              description={this.props.video.data.text}
              author={this.props.video.data.author_id}
              timestamp={this.props.video.data.timestamp}
              views={this.props.video.data.views}
              id={this.props.video.data.id}
              loading={this.props.video.changing}
            />
            <div className="container">
              <VideoComments id={this.props.video.data.id}/>
            </div>
          </div>
          <div className="col-4" style={{paddingLeft: "1rem"}}>
            <VideoSuggestions suggestions={this.props.video.suggestions} loading={this.props.video.changing}/>
          </div>
        </div>
      </div>
    )
  }
}


export default Video;
