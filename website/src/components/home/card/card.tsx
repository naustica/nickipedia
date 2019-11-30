import React, { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './../home.scss'
import ConvertTime, { convertDurationTime } from './../../../utils/datetime'

interface Props {
  result: any,
  loading: boolean
}

interface State {
  maxLength: number,
  likes: number,
  comments: number,
  timestamp: string,
  loading: boolean
}


export default class Card extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      maxLength: 60,
      likes: 0,
      comments: 0,
      timestamp: null,
      loading: false
    }
  }
  private computeDate = (): void => {
    let data: any = [{timestamp: this.props.result.timestamp}]
    ConvertTime(data)
    this.setState({timestamp: data[0].timestamp})
  }
  public componentDidMount = (): void => {
    this.setState({loading: true})
    this.computeDate()
    this.setState({loading: false})
  }
  public render = (): ReactNode => {
    const checkLengthTitle = this.props.result.title.length > this.state.maxLength ? this.props.result.title.substring(0, this.state.maxLength) + '...' : this.props.result.title
    const loadingState = this.props.loading ? (<div className="col-3"><div className="frontpage-suggestions-card"></div></div>) : (
      <div className="col-3">
      <div className="frontpage-suggestions-card">
        <Link to={'/watch/' + this.props.result.id} style={{color: "black"}}>
        <div className="frontpage-suggestions-card-img">
          <img className="" src={'media/default/background.jpg'} alt="..." />
          <span className="frontpage-suggestions-card-video-duration">{convertDurationTime(this.props.result.duration)}</span>
        </div>
        <div className="frontpage-suggestions-card-body">
          <p className="frontpage-suggestions-card-title">{checkLengthTitle}</p>
          <div className="frontpage-suggestions-card-info">
            <p className="frontpage-suggestions-card-author">{this.props.result.author_id}</p>
            <p className="frontpage-suggestions-card-views">{this.props.result.views + " views" + " • " + this.state.timestamp}</p>
          </div>
        </div>
        </Link>
      </div>
      </div>
    )
    return loadingState
  }
}
