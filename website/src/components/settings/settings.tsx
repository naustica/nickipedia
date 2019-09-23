import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {connect} from 'react-redux';

import './settings.scss';
import {fetchAuthenticationStart, fetchUser} from './../../store/actions/authenticationActions';


@(connect((store: any) => {
  return {
    user: store.authentication
  }
}) as any)
class Settings extends Component<{dispatch?: any, user?: any}, {darkmode: boolean, hiddenAudio: any}> {
  constructor(props:any) {
    super(props)
    this.state = {
      hiddenAudio: new Audio('/media/default/song.mp3'),
      darkmode: false
    }
    this.handleDarkmode = this.handleDarkmode.bind(this)
  }
  componentWillMount() {
    window.scrollTo(0, 0)
    const username = localStorage.getItem('username')
    this.getUserData(username)
  }
  getUserData(username: string) {
    Promise.all([
      this.props.dispatch(fetchAuthenticationStart()),
      this.props.dispatch(fetchUser(username))
    ])
  }
  handleDarkmode(event: any): void {
    this.setState({darkmode: event.target.checked})
    if (event.target.checked === true) {
      this.state.hiddenAudio.play()
      //document.body.style.background = "black"
      //document.body.style.color = "white"
    }
    else {
      //document.body.style.background = "#F5F5F5"
      //document.body.style.color = "black"
      this.state.hiddenAudio.pause()
    }
  }
  render() {
    return (
      <div className="container" style={{padding: "2rem"}}>
        <h3 style={{paddingBottom: "2rem", fontSize: "22px", fontWeight: 500}}>settings</h3>
        <div className="row">
        <Tabs className="settings-tabs" selectedTabClassName="settings-tab--selected">
          <div className="col-3">
          <TabList className="settings-tablist">
            <Tab className="settings-tab">account</Tab>
            <Tab className="settings-tab">advanced settings</Tab>
          </TabList>
          </div>
          <div className="col-9">
          <TabPanel className="settings-tabpanel">
            <h3 style={{paddingBottom: "2rem", fontSize: "20px", fontWeight: 500}}>account</h3>
            <div className="container">
              <div className="col-8">
                <p>
                  <b>username</b>
                  <br />
                  {this.props.user.data.username}
                </p>
                <p>
                  <b>email</b>
                  <br />
                  {this.props.user.data.email}
                </p>
                <div style={{paddingTop: "5rem"}}>
                <button className="btn" id="btn-profile">update profile</button>
                </div>
              </div>
              <div className="col-4">
                <p style={{fontWeight: 500}}>profil picture</p>
                <img src="media/default/default_pic_a.jpg" id="img-profil-settings" />
              </div>
            </div>
          </TabPanel>
          <TabPanel className="settings-tabpanel">
            <h3 style={{paddingBottom: "2rem", fontSize: "20px", fontWeight: 500}}>advanced settings</h3>
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <input className="slider" type="checkbox" name="" onChange={this.handleDarkmode}/>
                  </div>
                <div className="col-9">
                  <p style={{display: "inline", paddingLeft: "0.5rem"}}>go sicko mode</p>
                </div>
              </div>
            </div>
          </TabPanel>
          </div>
        </Tabs>
        </div>
      </div>
    )
  }
}


export default Settings;
