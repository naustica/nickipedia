import React, { Component, ReactNode } from 'react'
import {Link} from 'react-router-dom'
import { IoIosPlay } from 'react-icons/io'
import { GoKebabVertical } from 'react-icons/go'
import { IconContext } from 'react-icons'

import './../results.scss'
import ConvertTime, { convertDurationTime } from './../../../utils/datetime'

interface Props {
  result:any,
  fetching: boolean
}

interface State {
  maxLength: number,
  likes: number,
  comments: number,
  timestamp: any,
  loading: boolean
}


export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      maxLength: 200,
      likes: 0,
      comments: 0,
      timestamp: null,
      loading: false
    }
  }

  public componentDidMount = (): void => {
    this.setState({loading: true})
    this.computeLikes()
    this.computeComments()
    this.computeDate()
    this.setState({loading: false})
  }

  private computeLikes = (): void => {
    var i
    let likes = 0
    for (i=0; i < this.props.result.voting.length; i++) {
      if (this.props.result.voting[i].like === 1) {
        likes++
      }
      this.setState({likes: likes})
    }
  }

  private computeComments = (): void => {
    let i
    let comments = 0
    for (i=0; i < this.props.result.comments.length; i++) {
        comments++
      }
      this.setState({comments: comments})
  }

  private computeDate = (): void => {
    let data:any = [{timestamp: this.props.result.timestamp}]
    ConvertTime(data)
    this.setState({timestamp: data[0].timestamp})
  }

  public render = (): ReactNode => {
    const checkLengthDescription = this.props.result.text.length > this.state.maxLength ? this.props.result.text.substring(0, this.state.maxLength) + '...' : this.props.result.text
    const loadingStyles = this.props.fetching ? {backgroundColor: "#E0DFDF", color: "transparent", boxShadow: "none", border: "none"} : {}
    return (
        <div className="result-card">
          <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
            <div className="result-card-img">
              <img src={'media/default/background.jpg'} className="result-card-img" alt="..." />
              <span className="result-card-video-duration">{convertDurationTime(this.props.result.duration)}</span>
              <div className="result-card-img-overlay">
                <IconContext.Provider value={{size: "26px"}}>
                  <IoIosPlay />
                </IconContext.Provider>
              </div>
            </div>
            <div className="result-card-body">
              <h1 className="result-card-title">{this.props.result.title}</h1>
              <p className="result-card-info">{this.props.result.author_id} • {this.props.result.views + ' views'} • {this.state.timestamp}</p>
              <p className="result-card-description">{checkLengthDescription}</p>
              <div className="result-card-options">
                <IconContext.Provider value={{size: "20px"}}>
                  <GoKebabVertical />
                </IconContext.Provider>
              </div>
            </div>
          </Link>
        </div>
  )
  }
}
