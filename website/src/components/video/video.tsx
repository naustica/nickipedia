import React, {Component} from 'react';

import './video.scss'

import VideoStream from './stream/stream';
import VideoDescription from './description/description';
import VideoPostComments from './comments/postComments';
import VideoGetComments from './comments/getComments';
import VideoSuggestions from './suggestions/suggestions';


class Video extends Component<{match?: any}, {title: string, description: string, author: string, getCommentsComponent: any}> {
  constructor(props:any) {
    super(props)
    this.state = {
      title: '',
      description: '',
      author: '',
      getCommentsComponent: null
    }
  }
  componentDidMount() {
    const {id} = this.props.match.params
    fetch('api/video?video_id=' + id, {
      method: 'get'
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({title: data.title, description: data.text, author: data.author_id})
      fetch('api/comment?all=True&video_id=' + id, {
        method: 'get'
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({getCommentsComponent: data.map(comment => <VideoGetComments key={comment.id} comment={comment} />)})
      })
      .catch(() => {
        this.setState({getCommentsComponent: <div></div>})
      })

    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <VideoStream />
            <VideoDescription title={this.state.title} description={this.state.description} author={this.state.author}/>
            <div className="container">
              <VideoPostComments />
            </div>
          </div>
          <div className="col-sm-3" style={{backgroundColor: "transparent", opacity: 0.95}}>
            <VideoSuggestions />
          </div>
        </div>
        <div className="row">
          <div className="container">
            {this.state.getCommentsComponent}
          </div>
        </div>
      </div>
    )
  }
}


export default Video;
