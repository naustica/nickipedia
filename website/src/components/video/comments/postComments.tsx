import React, {Component} from 'react';
import axios from 'axios';

import './../video.scss'


class VideoPostComments extends Component<{}, {}> {
  constructor(props:any) {
    super(props)
    this.state = {
      comment: ''
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  submitForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
    event.preventDefault();
    axios.post('api/comment')
      .then((response) => {

      })
      .catch(error => {
        console.log(error)
        form.reset();
      })
  }
  render() {
    return (
      <div className="media">
        <img src="http://0.0.0.0:8000/default/default_pic_a.jpg" className="align-self-start mr-3" id="img-profil" />
        <div className="media-body">
          <div className="mb-0">
            <form onSubmit={this.submitForm}>
              <div className="form-group input-group-lg">
                <input className="form-control from-control-lg" type="text" name="comment" onChange={this.onChange} placeholder="leave a comment..."/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}


export default VideoPostComments;
