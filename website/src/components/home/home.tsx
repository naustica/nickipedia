import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './home.scss'

import Card from './card/card';

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
          <div className="col-2">
            <div className="card" id="trends-card">
              <div className="card-body" style={style}>
                <h3 className="card-title">trends</h3>
                <ul>
                  <Link to={"/"} style={style}><li>#kek</li></Link>
                  <Link to={"/"} style={style}><li>#lel</li></Link>
                  <Link to={"/"} style={style}><li>#lul</li></Link>
                  <Link to={"/"} style={style}><li>#kieling</li></Link>
                  <Link to={"/"} style={style}><li>#marcel davis</li></Link>
                  <Link to={"/"} style={style}><li>#bachenbenno</li></Link>
                  <Link to={"/"} style={style}><li>#fistus</li></Link>
                  <Link to={"/"} style={style}><li>#saas</li></Link>
                  <Link to={"/"} style={style}><li>#pooper</li></Link>
                  <Link to={"/"} style={style}><li>#laal</li></Link>
                </ul>
              </div>
            </div>
            <div className="card" id="links-card">
              <div className="card-body" style={style}>
                <h4 className="card-title">key links</h4>
                <ul>
                  <Link to={"/"} style={style}><li>about</li></Link>
                  <Link to={"/"} style={style}><li>contact</li></Link>
                  <Link to={"/"} style={style}><li>faq</li></Link>
                  <Link to={"/"} style={style}><li>github</li></Link>
                  <Link to={"/"} style={style}><li>twitter</li></Link>
                  <Link to={"/"} style={style}><li>privacy policy</li></Link>
                  <Link to={"/"} style={style}><li>terms of use</li></Link>
                  <Link to={"/"} style={style}><li>code of conduct</li></Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-10">
          <h2 className="frontpage-suggestions-header">Recommended</h2>
            <div className="row">
                {this.renderCards(0, 8)}
            </div>
            <h2 className="frontpage-suggestions-header" style={style}>Suggestions</h2>
            <div className="row">
              {this.renderCards(8, 16)}
            </div>
            </div>
          </div>
        </div>
    )
  }
}

export default withRouter(Home);
