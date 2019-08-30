import React, {Component} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import './settings.scss';


class Settings extends Component<{}, {darkmode: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      darkmode: false
    }
    this.handleDarkmode = this.handleDarkmode.bind(this)
  }
  handleDarkmode(event: any):void {
    this.setState({darkmode: event.target.checked})
    if (event.target.checked === true) {
      document.body.style.background = "black"
      document.body.style.color = "white"
    }
    else {
      document.body.style.background = "#F5F5F5"
      document.body.style.color = "black"
    }
  }
  render() {
    return (
      <div className="container" style={{padding: "2rem"}}>
        <h3 style={{paddingBottom: "2rem"}}>settings</h3>
        <div className="row">
        <Tabs>
          <div className="col-3">
          <TabList>
            <Tab>account</Tab>
            <Tab>advanced settings</Tab>
          </TabList>
          </div>
          <div className="col-9">
          <TabPanel>
            <h3>account</h3>
          </TabPanel>
          <TabPanel>
            <h3 style={{paddingBottom: "2rem"}}>advanced settings</h3>
            <div>
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
