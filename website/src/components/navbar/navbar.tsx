import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { IoMdNotificationsOutline, IoMdSettings, IoMdExit, IoMdVideocam } from 'react-icons/io'
import { GoDeviceCameraVideo } from 'react-icons/go'
import { IconContext } from "react-icons"

import './navbar.scss';


class Navbar extends Component<{history: any}, {toggleSettings: boolean, toggleMessage: boolean, term: string, options: any, suggestions: Array<any>, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      toggleSettings: false,
      toggleMessage: false,
      term: '',
      options: [],
      suggestions: [],
      loading: false
    }

    this.onClickUpload = this.onClickUpload.bind(this)
    this.onWindowClick = this.onWindowClick.bind(this)
    this.getTerm = this.getTerm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    this.setState({loading: true})
    fetch('api/video?all=True', {
    })
      .then ((response => {
        const status = response.status
        const data = response.json()
        return Promise.all([status, data])
      }))
      .then(([status, data]) => {
        if (status === 200) {
          let options = new Set([])
          let words = []
          const results = data.map(result => result.title.split(' '))
          for (var i=0; i < data.length; i++) {
            words = words.concat(results[i])
          }
          for (var i=0; i < words.length; i++) {
            let word = words[i].replace(/[&\/\\,+()$~%.'":*?<>{}]/g, '')
            options = options.add(word)
          }
          this.setState({options: Array.from(options)})
        }
        else {
          this.setState({loading: false})
          console.log(status)
        }
        })
        .catch(error => {
          console.log(error)
        })
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }
  getTerm(event:React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
    suggestions = this.state.options.sort().filter(v => regex.test(v))
    suggestions = suggestions.slice(0, 5)
    }
    this.setState({term: value, suggestions: suggestions})
  }
  suggestionsSelected(value) {
    this.setState({term: value, suggestions: []})
    this.props.history.push('/result/' + value)
  }
  renderSuggestions() {
    if (this.state.suggestions.length === 0) {
      return null
    }
    return (
      <ul className="search-suggestions">
        {this.state.suggestions.map((item => <li key={item} onClick={() => this.suggestionsSelected(item)}>{item}</li>))}
      </ul>
    )
  }
  submitForm(event): any {
    const form = event.target as HTMLFormElement;
    const term = this.state.term
    event.preventDefault();
    if (term === '') {
      return null
    }
    else {
      fetch('api/search?term=' + term)
        .then(() => {
          this.setState({term: '', suggestions: []})
          this.props.history.push('/result/' + term)
        })
        .catch(error => {
          console.log(error)
          form.reset();
        })
    }
  }
  onClickToggleNotifications = (event:any): any => {
    const toggle = this.state.toggleMessage
    this.setState({toggleMessage: !toggle})
  }
  onClickToggleSettings = (event:any): any => {
    const toggle = this.state.toggleSettings
    this.setState({toggleSettings: !toggle})
  }
  onClickUpload(event:React.MouseEvent<HTMLButtonElement>): any {
    this.props.history.push('/upload')
  }
  onWindowClick(event):any {
    if (this.state.toggleSettings) {
      if (event.target.className !== 'navbar-user' && event.target.className !== 'navbar-user-pic'
        && event.target.className !== 'navbar-toggle-user-settings')
          {
            this.setState({toggleSettings: false})
          }
    }
    if (this.state.toggleMessage) {
      if (event.target.className !== 'navbar-toggle-message' && event.target.tagName !== 'svg')
          {
            this.setState({toggleMessage: false})
          }
    }
  }
  render() {
    const toggleSettingsStyle = this.state.toggleSettings ? {display: "inline"} : {display: "none"}
    const toggleMessageStyle = this.state.toggleMessage ? {display: "inline"} : {display: "none"}
    const searchStyle = this.state.suggestions.length > 0 ? {borderBottomLeftRadius: "0", borderBottomRightRadius: "0"} : {borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}
    const username = localStorage.getItem('username')

    return (
      <div className="nav-header">
        <nav className="navbar">
          <div className="navbar-menu">
            <div className="navbar-menu-line"></div>
            <div className="navbar-menu-line"></div>
            <div className="navbar-menu-line"></div>
          </div>
          <div className="navbar-logo">
            <Link to='/'>
              <div>
              <IconContext.Provider value={{size: "21px"}}>
                <GoDeviceCameraVideo style={{color: "red", paddingRight: "0.1rem"}}/>
              </IconContext.Provider>
              nickipedia
              </div>
            </Link>
          </div>
          <div className="navbar-search">
            <form method="POST" onSubmit={this.submitForm}>
              <div className="navbar-form-group">
                <input className="navbar-form-input" style={searchStyle} type="text" name="search" value={this.state.term} onChange={this.getTerm} autoFocus placeholder="search"/>
                {this.renderSuggestions()}
              </div>
            </form>
          </div>
          <div className="navbar-upload">
            <button type="button" className="upload-button" onClick={this.onClickUpload}>
              <IconContext.Provider value={{size: "26px"}}>
                <IoMdVideocam />
              </IconContext.Provider>
            </button>
          </div>
          <div className="navbar-messages">
            <button type="button" className="message-button" name="message" onClick={this.onClickToggleNotifications}>
              <IconContext.Provider value={{size: "26px"}}>
                <IoMdNotificationsOutline />
              </IconContext.Provider>
            </button>
            <div className="navbar-toggle-message" style={toggleMessageStyle}>
              <div className="navbar-toggle-message-header">
                Notifications
              </div>
              <div className="navbar-toggle-message-body">
                No new Notifications
              </div>
            </div>
          </div>
          <div className="navbar-user">
            <img src="media/default/default_pic_a.jpg" className="navbar-user-pic" onClick={this.onClickToggleSettings} />
            <div className="navbar-toggle-user-settings" style={toggleSettingsStyle}>
              <div className="navbar-toggle-user-info">
                <img src="media/default/default_pic_a.jpg" className="navbar-toggle-user-pic" />
                <div className="navbar-toggle-user-text">
                  <h1 className="navbar-toggle-user-username">{username}</h1>
                  <h2 className="navbar-toggle-user-email">test@lul.de</h2>
                </div>
              </div>
              <hr />
              <Link to={'/settings'} style={{color: "black"}} onClick={this.onClickToggleSettings}>
                <div className="navbar-toggle-user-settings-links">
                  <IconContext.Provider value={{size: "25px"}}>
                    <IoMdSettings style={{color: "#313131", marginRight: "15px"}}/>
                  </IconContext.Provider>
                  Settings
                </div>
              </Link>
              <Link to={'/logout'} style={{color: "black"}} onClick={this.onClickToggleSettings}>
                <div className="navbar-toggle-user-settings-links">
                  <IconContext.Provider value={{size: "25px"}}>
                    <IoMdExit style={{color: "#313131", marginRight: "15px"}}/>
                  </IconContext.Provider>
                  Logout
                </div>
              </Link>
            </div>
        </div>
      </nav>
    </div>
  )
  }
}


export default withRouter(Navbar);
