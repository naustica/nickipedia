import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Octicon, {FileDirectory, Bell, Gear} from '@primer/octicons-react';

import './navbar.scss';

import Breadcrumb from './../breadcrumb/breadcrumb';


class Navbar extends Component<{history: any}, {toggle: boolean, term: string, options: any, suggestions: Array<any>, loading: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      toggle: false,
      term: '',
      options: [],
      suggestions: [],
      loading: false
    }

    this.onClickToggleMenu = this.onClickToggleMenu.bind(this)
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
          var i
          const results = data.map(result => result.title.split(' '))
          for (i=0; i < data.length; i++) {
            words = words.concat(results[i])
          }
          for (i=0; i < words.length; i++) {
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
  onClickToggleMenu(event:React.MouseEvent<HTMLButtonElement>): any {
    const toggle = this.state.toggle
    this.setState({toggle: !toggle})
  }
  onClickUpload(event:React.MouseEvent<HTMLButtonElement>): any {
    this.props.history.push('/upload')
  }
  onWindowClick(event):any {
    if (event.target.name !== 'settings' && event.target.tagName.toLowerCase() !== 'path' && event.target.tagName.toLowerCase() !== 'a' && event.target.tagName.toLowerCase() !== 'li' && event.target !== document.querySelector('[aria-label="settings"]')) {
      this.setState({toggle: false})
    }
  }
  render() {
    const toggleStyle = this.state.toggle ? {display: "inline"} : {display: "none"}
    const searchStyle = this.state.suggestions.length > 0 ? {borderBottomLeftRadius: "0", borderBottomRightRadius: "0"} : {borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px"}
    return (
      <div className="nav-header" style={{backgroundColor: "#FDF9F3", borderBottom: "1px solid #D0CDC8"}}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light">

          <Link to='/' className="navbar-brand" style={{paddingLeft: "1.5rem", fontWeight: 500, fontSize: "20px"}}>nickipedia</Link>

          <div className="mx-auto" style={{width: "50%"}}>
            <form method="POST" onSubmit={this.submitForm} style={{position: "fixed", width: "50%", top: "0.4rem", left: "auto", right: "auto"}}>
              <div className="form-group input-group">
                <input className="form-control from-control" id="form-control-search" style={searchStyle} type="text" name="search" value={this.state.term} onChange={this.getTerm} autoFocus placeholder="search"/>
                {this.renderSuggestions()}
              </div>
              </form>
          </div>

          <button type="button" className="btn" id="btn-upload" style={{marginRight: "1.5rem"}} onClick={this.onClickUpload}>upload a video</button>
          <div>
          <button type="button" className="btn" id="btn-control" name="settings" style={{marginRight: "1.5rem", border: "none", height: "100%"}} onClick={this.onClickToggleMenu}>
            <Octicon icon={Gear} size="medium" ariaLabel="settings"/>
          </button>
          </div>

        </nav>
      <div className="toggle-menu" style={toggleStyle}>
        <ul>
          <Link to={'/settings'} style={{color: "black"}}><li>settings</li></Link>
          <Link to={'/logout'} style={{color: "black"}}><li>logout</li></Link>
        </ul>
      </div>
    </div>
  )
  }
}


export default withRouter(Navbar);
