import React, { Component, ReactNode } from 'react'
import { connect } from 'react-redux'
import { IoMdHome } from 'react-icons/io'
import { GoFileDirectory, GoFlame } from 'react-icons/go'
import { IconContext } from 'react-icons'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import cx from 'classnames'

import './home.scss'

import Card from './card/card'

import { fetchVideos, fetchVideoStart, getVideoSuggestions, getVideoSuggestionsStart } from './../../store/actions/videoActions'


interface Props {
  dispatch?: any,
  videos?: any
}


const MAX_SUGGESTIONS: number = 16


@(connect((store: any) => {
  return {
    videos: store.video
  }
}) as any)
class Home extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  public componentWillMount = (): void => {
    window.scrollTo(0, 0)
    Promise.all([
      this.props.dispatch(fetchVideoStart()),
      this.props.dispatch(getVideoSuggestionsStart()),
      this.props.dispatch(fetchVideos())
    ]).then(() => {
      this.props.dispatch(getVideoSuggestions(null, MAX_SUGGESTIONS))
    })
  }

  private renderCards = (begin: number, end: number): ReactNode => {

    let result: any

    let loadingCards = []
    let contentCards = []

    for (var i = begin; i < end; i++) {
      result = this.props.videos.suggestions[i]
      if (result != undefined) {
        contentCards.push(<Card key={result.id} result={result} loading={this.props.videos.changing}/>)
      }
      else {
        loadingCards.push(<div className="col-3" key={i}><div className="frontpage-suggestions-card"></div></div>)
      }
    }
    if (result != undefined) {
      return contentCards
    }
    else {
      return loadingCards
    }
  }

  public render = (): ReactNode => {
    return (
      <div className="container" id="home-container">
        <div className="row">
          <Tabs className="navbar-tabs" selectedTabClassName="navbar-tab--selected">
          <div className="col-1">
            <div className="navbar-side">
            <TabList className="navbar-tablist">
              <Tab className="navbar-tab">
                <div className="navbar-side-logo">
                  <IconContext.Provider value={{size: "24px"}}>
                    <IoMdHome />
                  </IconContext.Provider>
                  <h1>Home</h1>
              </div>
              </Tab>
              <Tab className="navbar-tab">
                <div className="navbar-side-logo">
                  <IconContext.Provider value={{size: "24px"}}>
                    <GoFlame />
                  </IconContext.Provider>
                  <h1 style={{paddingLeft: "33px"}}>Trending</h1>
              </div>
              </Tab>
              <Tab className="navbar-tab">
                <div className="navbar-side-logo">
                  <IconContext.Provider value={{size: "24px"}}>
                    <GoFileDirectory />
                  </IconContext.Provider>
                  <h1>Library</h1>
              </div>
              </Tab>
            </TabList>
            </div>
          </div>
          <div className="col-11" style={{paddingLeft: "50px"}}>
          <TabPanel>
          <h2 className={cx("frontpage-suggestions-header", {["frontpage-suggestions-header--loading"]: Boolean(this.props.videos.changing)})}>Recommended</h2>
            <div className="row">
                {this.renderCards(0, 8)}
            </div>
            <h2 className={cx("frontpage-suggestions-header", {["frontpage-suggestions-header--loading"]: Boolean(this.props.videos.changing)})}>Suggestions</h2>
            <div className="row">
              {this.renderCards(8, 16)}
            </div>
            </TabPanel>
            <TabPanel>
            </TabPanel>
            <TabPanel>
            </TabPanel>
            </div>
            </Tabs>
          </div>
        </div>
    )
  }
}

export default Home
