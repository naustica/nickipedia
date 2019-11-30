import React, { Component, ReactNode } from 'react'
import {Link} from 'react-router-dom'
import { IoMdOptions } from 'react-icons/io'
import { IconContext } from 'react-icons'


import './../video.scss'

import Loading from './../../loading/loading'
import ConvertTime from './../../../utils/datetime'

interface Props {
  id: number,
  loading: boolean
}

interface State {
  data?: any,
  comment?: string,
  loading?: boolean
}


export default class VideoComments extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: [],
      comment: '',
      loading: false
    }
  }
  private getComments = async (id: number): Promise<void> => {
    await fetch('api/comment?all=True&video_id=' + id, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) => {
        ConvertTime(data)
        this.setState({data: data})
        if (! Array.isArray(this.state.data)) {
          this.setState({data: []})
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  public componentDidMount = (): void => {
    this.getComments(this.props.id)
  }
  public componentDidUpdate = (prevProps: Props) => {
    if (this.props.id !== prevProps.id) {
      this.getComments(this.props.id)
    }
  }
  private onChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({[event.target.name]: event.target.value})
  }
  private submitForm = (event:React.FormEvent<HTMLFormElement>): any => {
    const access_token = localStorage.getItem('access_token')
    const username = localStorage.getItem('username')
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
        let date:any = new Date()
        let toConvertedDate = [{timestamp: date}]
        ConvertTime(toConvertedDate)
        this.state.data.push({id: date.getTime(), video_id: this.props.id, author_id: username, content: this.state.comment, timestamp: toConvertedDate[0].timestamp})
        this.setState({loading: false})
      })
      .catch(error => {
        console.log(error)
        form.reset();
      })
  }
  public render = (): ReactNode => {
    const postForm = (
      <div className="comment-write-card">
        <div className="comment-write-card-img">
          <img src="media/default/default_pic_a.jpg" className="" />
        </div>
        <div className="comment-write-body">
          <div className="comment-write-form">
            <form onSubmit={this.submitForm}>
              <div className="comment-form-group">
                <input className="comment-form-input" type="text" name="comment" onChange={this.onChange} placeholder="Leave a comment..."/>
                <span className="comment-form-border"></span>
                <button type="submit" style={{display: "none"}}></button>
                <Loading loading={this.state.loading}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
    const getComments = this.state.data.length === undefined ? (<div></div>) :
      (this.state.data.sort((a, b) => b.id - a.id).map(comment =>
        <div className="comment-read-card" key={comment.id}>
          <div className="comment-read-card-img">
            <img src="media/default/default_pic_a.jpg" className="" />
          </div>
          <div className="comment-read-card-body">
            <div className="comment-read-card-author">{comment.author_id} @<Link to="/" style={{fontSize: "13px"}}>{ comment.author_id }</Link><span style={{paddingLeft: "0.5rem", color: "#757D85", fontSize: "13px"}}>{comment.timestamp}</span></div>
            <div className="comment-read-card-text">{comment.content}</div>
          </div>
        </div>
      ))


    if (this.props.loading) {
      return (
        <div className="video-comment-container" />
      )
    }


    return (
      <div className="video-comment-container">
        <div className="comments-info">
          <h1 className="comments-info-counter">{this.state.data.length + ' Comments'}</h1>
          <h2 className="comments-info-sorter">
            <IconContext.Provider value={{size: "24px"}}>
              <IoMdOptions style={{paddingRight: "5px"}}/>
            </IconContext.Provider>
            Sort By
          </h2>
        </div>
        {postForm}
        <div className="container">
          {getComments}
        </div>
      </div>
    )
  }
}
