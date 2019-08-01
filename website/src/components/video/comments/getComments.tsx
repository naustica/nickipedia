import React, {Component} from 'react';


import './../video.scss'


class VideoGetComments extends Component<{comment: any}, {}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    return (
      <div className="media" id="posts" style={{opacity: 0.95, marginLeft: "1rem", border: "2px solid #ccc", width: "70%"}}>
        <img src="" className="align-self-center mr-3" id="img-profil" />
        <div className="media-body">
          <div className="mt-0">username</div>
          <div className="mb-0">content</div>
        </div>
      </div>
    )
  }
}


export default VideoGetComments;
