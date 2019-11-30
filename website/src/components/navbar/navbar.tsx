import React, { Component, ReactNode } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { IoMdNotificationsOutline, IoMdSettings, IoMdExit, IoMdVideocam, IoMdHome, IoMdAlbums } from 'react-icons/io'
import { GoDeviceCameraVideo, GoFlame } from 'react-icons/go'
import { IconContext } from 'react-icons'
import cx from 'classnames'

import './navbar.scss'

import Upload from './../upload/upload'


interface Props {
  history: any
}

interface State {
  toggleSettings: boolean,
  toggleMessage: boolean,
  toggleUpload: boolean,
  toggleSidebar: boolean,
  term: string,
  preTerm: string,
  options: any,
  suggestions: Array<any>,
  cursorSearch: number
  loading: boolean
}


class Navbar extends Component<Props, State> {

  private messageToggler: any
  private settingsToggler: any
  private uploadToggler: any
  private sidebarToggler: any
  private searchSuggestions: any
  private searchBar: any

  constructor(props: any) {
    super(props)
    this.state = {
      toggleSettings: false,
      toggleMessage: false,
      toggleUpload: false,
      toggleSidebar: false,
      term: '',
      preTerm: '',
      options: [],
      suggestions: [],
      cursorSearch: -1,
      loading: false
    }
  }

  private messageTogglerRef = (messageToggler: any): void => {
    this.messageToggler = messageToggler
  }

  private settingsTogglerRef = (settingsToggler: any): void => {
    this.settingsToggler = settingsToggler
  }

  private uploadTogglerRef = (uploadToggler: any): void => {
    this.uploadToggler = uploadToggler
  }

  private sidebarTogglerRef = (sidebarToggler: any): void => {
    this.sidebarToggler = sidebarToggler
  }

  private searchSuggestionsRef = (searchSuggestions: any): void => {
    this.searchSuggestions = searchSuggestions
  }

  private searchBarRef = (searchBar: any): void => {
    this.searchBar = searchBar
  }

  public componentDidMount = (): void => {
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

  public componentWillUnmount = (): void => {
    window.removeEventListener('click', this.onWindowClick);
  }

  private getTerm = (event: any): void => {
    const value = event.target.value
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i')
    suggestions = this.state.options.sort().filter(v => regex.test(v))
    suggestions = suggestions.slice(0, 5)
    }
    this.setState({term: value, preTerm: value, suggestions: suggestions, cursorSearch: -1})
  }

  private suggestionsSelected = (value: string): void => {
    this.setState({term: value, suggestions: []})
    this.props.history.push('/result/' + value)
  }

  private renderSuggestions = (): ReactNode => {

    const { cursorSearch } = this.state

    if (this.state.suggestions.length === 0) {
      return null
    }
    return (
      <ul className="search-suggestions" ref={this.searchSuggestionsRef}>
        {this.state.suggestions.map((item, i) => <li key={item} tabIndex={i} onFocus={() => this.setState({term: item})} onClick={() => this.suggestionsSelected(item)} onKeyDown={this.handleKeySearchNavigation}>{item}</li>)}
      </ul>
    )
  }

  private submitForm = (event): any => {
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

  private handleKeySearchNavigation = (event: any): void => {
    const { cursorSearch, suggestions, term, preTerm } = this.state

    let cursor = cursorSearch

    switch (event.keyCode) {

      // arrow up
      case 38:
        event.preventDefault()
        if (cursorSearch > 0) {
          cursor = cursor - 1
          this.searchSuggestions.children[cursor].focus()
        }
        if (cursorSearch === 0) {
          this.searchBar.focus()
          cursor = -1
          this.setState({term: preTerm})
        }
        break

      //arrow down
      case 40:
        event.preventDefault()
        if (cursorSearch < suggestions.length-1) {
          cursor = cursor + 1
          this.searchSuggestions.children[cursor].focus()
        }
        if (cursorSearch === suggestions.length-1) {
          this.searchBar.focus()
          cursor = -1
          this.setState({term: preTerm})
        }
        break

      // enter
      case 13:
        event.preventDefault()
        cursor = -1
        this.suggestionsSelected(term)
    }
    this.setState({cursorSearch: cursor})
  }


  private onClickToggleNotifications = (event:any): void => {
    const toggle = this.state.toggleMessage
    this.setState({toggleMessage: !toggle})
  }
  private onClickToggleSettings = (event:any): void => {
    const toggle = this.state.toggleSettings
    this.setState({toggleSettings: !toggle})
  }
  private onClickToggleSidebar = (event: any): void => {
    const toggle = this.state.toggleSidebar
    this.setState({toggleSidebar: !toggle})
  }
  private onClickUpload = (event: React.MouseEvent<HTMLButtonElement>): void => {
    //this.props.history.push('/upload')
    const toggle = this.state.toggleUpload
    this.setState({toggleUpload: !toggle})
  }

  private onWindowClick = (event: { target: any; }): void => {

    if (this.state.toggleSettings) {
      if (event.target !== this.settingsToggler && !this.settingsToggler.contains(event.target))
          {
            this.setState({toggleSettings: false})
          }
    }
    if (this.state.toggleMessage) {
      if (event.target !== this.messageToggler && !this.messageToggler.contains(event.target))
          {
            this.setState({toggleMessage: false})
          }
    }
    if (this.state.toggleUpload) {
      if (event.target === this.uploadToggler)
          {
            this.setState({toggleUpload: false})
          }
    }
    if (this.state.toggleSidebar) {
      if (event.target !== this.sidebarToggler && !this.sidebarToggler.contains(event.target))
          {
            this.setState({toggleSidebar: false})
          }
    }
  }
  public render = (): ReactNode => {
    const { toggleSettings, toggleSidebar } = this.state
    const toggleSettingsStyle = this.state.toggleSettings ? {display: "inline"} : {display: "none"}
    const toggleMessageStyle = this.state.toggleMessage ? {display: "inline"} : {display: "none"}
    const toggleUploadStyle = this.state.toggleUpload ? {display: "inline"} : {display: "none"}
    const searchStyle = this.state.suggestions.length > 0 ? {borderBottomLeftRadius: "0", borderBottomRightRadius: "0"} : {borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}
    const username = localStorage.getItem('username')

    return (
      <div className="nav-header">
        <nav className="navbar">
        <div className="navbar-logo-menu" ref={this.sidebarTogglerRef}>
          <div className="navbar-menu" onClick={this.onClickToggleSidebar}>
            <div className="navbar-menu-line"></div>
            <div className="navbar-menu-line"></div>
            <div className="navbar-menu-line"></div>
          </div>
          <div className={cx("side-navbar", {["side-navbar--active"]: toggleSidebar})}>
            <div className="side-navbar-body">
              <div className="side-navbar-body-option">
                <IconContext.Provider value={{size: "24px"}}>
                  <IoMdHome />
                </IconContext.Provider>
                <h1>Home</h1>
              </div>
              <div className="side-navbar-body-option">
                <IconContext.Provider value={{size: "24px"}}>
                  <GoFlame />
                </IconContext.Provider>
                <h1>Trending</h1>
              </div>
              <div className="side-navbar-body-option">
                <IconContext.Provider value={{size: "24px"}}>
                  <IoMdAlbums />
                </IconContext.Provider>
                <h1>Subscriptions</h1>
              </div>
              <hr />
              <div className="side-navbar-body-header">Subscriptions</div>
              <div className="side-navbar-body-subscription">
                <img src="media/default/default_pic_a.jpg" />
                <span className="side-navbar-body-subscription-name">kek</span>
              </div>
              <hr />
              <div className="side-navbar-body-option">
                <IconContext.Provider value={{size: "24px"}}>
                  <IoMdSettings />
                </IconContext.Provider>
                <h1>Settings</h1>
              </div>
            </div>
          </div>
          <div className="navbar-logo">
            <Link to='/'>
              <div>
              <IconContext.Provider value={{size: "21px"}}>
                <GoDeviceCameraVideo style={{color: "#F53240", paddingRight: "0.1rem"}}/>
              </IconContext.Provider>
              nickipedia
              </div>
            </Link>
          </div>
          </div>
          <div className="navbar-search">
            <form method="POST" onSubmit={this.submitForm}>
              <div className="navbar-form-group">
                <input className="navbar-form-input" ref={this.searchBarRef} style={searchStyle} type="text" name="search" value={this.state.term} onChange={this.getTerm} placeholder="search" onKeyDown={this.handleKeySearchNavigation}/>
                {this.renderSuggestions()}
              </div>
            </form>
          </div>
          <div className="navbar-upload">
            <button type="button" className="upload-button" onClick={this.onClickUpload}>
              <IconContext.Provider value={{size: "25px"}}>
                <IoMdVideocam />
              </IconContext.Provider>
            </button>
            <Upload style={toggleUploadStyle} reference={this.uploadTogglerRef}/>
          </div>
          <div className="navbar-messages" ref={this.messageTogglerRef}>
            <button type="button" className="message-button" name="message" onClick={this.onClickToggleNotifications}>
              <IconContext.Provider value={{size: "25px"}}>
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
          <div className="navbar-user" ref={this.settingsTogglerRef}>
            <img src="media/default/default_pic_a.jpg" className={cx("navbar-user-pic", {["navbar-user-pic--selected"]: Boolean(toggleSettings)})} onClick={this.onClickToggleSettings} />
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
                  <IconContext.Provider value={{size: "21px"}}>
                    <IoMdSettings style={{color: "#313131", marginRight: "15px"}}/>
                  </IconContext.Provider>
                  Settings
                </div>
              </Link>
              <Link to={'/logout'} style={{color: "black"}} onClick={this.onClickToggleSettings}>
                <div className="navbar-toggle-user-settings-links">
                  <IconContext.Provider value={{size: "21px"}}>
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


export default withRouter(Navbar)
