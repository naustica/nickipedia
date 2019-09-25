import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { IoMdHome } from 'react-icons/io'
import { GoFileDirectory, GoFlame } from 'react-icons/go'
import { IconContext } from "react-icons"
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'

import './home.scss'

import Card from './card/card'

import {fetchVideos, fetchVideoStart, getVideoSuggestions, getVideoSuggestionsStart} from './../../store/actions/videoActions';


@(connect((store: any) => {
  return {
    videos: store.video
  }
}) as any)
class Home extends Component<{dispatch?: any, videos?: any},{}> {
  constructor(props:any) {
    super(props)
  }
  componentWillMount() {
    window.scrollTo(0, 0)
    Promise.all([
      this.props.dispatch(fetchVideoStart()),
      this.props.dispatch(getVideoSuggestionsStart()),
      this.props.dispatch(fetchVideos())
    ]).then(() => {
      this.props.dispatch(getVideoSuggestions(null, 16))
    })
  }
  renderCards(begin: number, end: number) {
    return (this.props.videos.suggestions.slice(begin, end).map(result => <Card key={result.id} result={result} loading={this.props.videos.changing}/>))
  }
  render() {
    const style = this.props.videos.changing ? {backgroundColor: "#E0DFDF", color: "transparent", boxShadow: "none", border: "none"} : {}
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
                  <h1>Trending</h1>
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
          <div className="col-11" style={{paddingLeft: "2rem"}}>
          <TabPanel>
          <h2 className="frontpage-suggestions-header" style={style}>Recommended</h2>
            <div className="row">
                {this.renderCards(0, 8)}
            </div>
            <h2 className="frontpage-suggestions-header" style={style}>Suggestions</h2>
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

export default withRouter(Home);
