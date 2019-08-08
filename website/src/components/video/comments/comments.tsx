import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import './../video.scss'

import Loading from './../../loading/loading';


class VideoComments extends Component<{id: number}, {data?: any, comment?: string, loading?: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      data: [],
      comment: '',
      loading: false
    }
    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.getComments = this.getComments.bind(this)
  }
  async getComments(id) {
    await fetch('api/comment?all=True&video_id=' + id, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({data: data})
        if (! Array.isArray(this.state.data)) {
          this.setState({data: []})
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  componentDidMount() {
    this.getComments(this.props.id)
  }
  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getComments(this.props.id)
    }
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  submitForm(event:React.FormEvent<HTMLFormElement>): any {
    const access_token = sessionStorage.getItem('access_token')
    const username = sessionStorage.getItem('username')
    var form = event.target as HTMLFormElement;
    event.preventDefault();
    this.setState({loading: true})
    fetch('api/comment', {
      method: 'post',
      headers: new Headers({
        "Authorization": access_token,
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({video_id: this.props.id, content: this.state.comment})
    })
      .then((response) => {
        form.reset();
        let date = new Date()
        this.state.data.push({id: date.getTime(), video_id: this.props.id, author_id: username, content: this.state.comment})
        this.setState({loading: false})
      })
      .catch(error => {
        console.log('error')
        form.reset();
      })
  }
  render() {
    const postForm = (
      <div className="media" style={{width: "70%"}}>
        <img src="http://0.0.0.0:8000/default/default_pic_a.jpg" className="align-self-start mr-3" id="img-profil" />
        <div className="media-body">
          <div className="mb-0" style={{paddingLeft: "0.5rem"}}>
            <form onSubmit={this.submitForm}>
              <div className="form-group input-group-lg">
                <input className="form-control from-control-lg" id="form-control-comment" type="text" name="comment" onChange={this.onChange} placeholder="leave a comment..."/>
                <button type="submit" style={{display: "none"}}></button>
                <Loading loading={this.state.loading}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
    const getComments = this.state.data.length === undefined ? (<div></div>) :
      (this.state.data.map(comment =>
        <div className="media" id="posts" key={comment.id} style={{opacity: 0.95, border: "2px solid #505458", width: "70%", boxShadow: "1px 1px 0 1px #ccc"}}>
          <img src="http://0.0.0.0:8000/default/default_pic_a.jpg" className="align-self-center mr-3" id="img-profil" />
          <div className="media-body" style={{marginLeft: "1rem"}}>
            <div className="mt-0">{comment.author_id} @<Link to="/">{ comment.author_id }</Link></div>
            <div className="mb-0">{comment.timestamp}</div>
            <div className="mb-0">{comment.content}</div>
          </div>
        </div>
      ))



    return (<div>{postForm}<div className="container">{getComments}</div></div>)
  }
}


export default VideoComments;
