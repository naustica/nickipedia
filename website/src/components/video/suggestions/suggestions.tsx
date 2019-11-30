import React, { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import './../video.scss'
import Loading from './../../loading/loading'

import { convertDurationTime } from './../../../utils/datetime'

interface Props {
  suggestions: any,
  loading: boolean
}

interface State {

}


export default class VideoSuggestions extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
  }

  private checkLengthTitle = (title: string): string => {
    if (title.length > 40) {
      return title.substring(0, 40) + '...'
    }
    else {
      return title
    }
  }

  private renderSuggestionsCards = (loading): ReactNode => {

    const content = loading ? this.props.suggestions.map((suggestion, i) => (
      <div className="video-suggestion-card" key={suggestion.id}>
      </div>
    )) : (
      this.props.suggestions.slice(0, 14).map(suggestion => (
        <div className="video-suggestion-card" key={suggestion.id}>
          <Link to={"/watch/" + suggestion.id}>
            <div className="video-suggestion-pic">
              <img src={'media/default/background.jpg'} className="" alt="..."/>
              <span className="video-suggestion-card-video-duration">{convertDurationTime(suggestion.duration)}</span>
            </div>
            <div className="video-suggestion-body">
              <h5 className="video-suggestion-title">{this.checkLengthTitle(suggestion.title)}</h5>
              <h6 className="video-suggestion-author">{suggestion.author_id}</h6>
              <p className="video-suggestion-views">{suggestion.views + " views"}</p>
            </div>
          </Link>
        </div>
      ))
    )
    return content
  }
  public render = (): ReactNode => {
    return this.renderSuggestionsCards(this.props.loading)
  }
}
