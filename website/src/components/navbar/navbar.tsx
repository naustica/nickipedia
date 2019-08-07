import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Octicon, {FileDirectory, Bell, Gear} from '@primer/octicons-react';

import './navbar.scss';

import Breadcrumb from './../breadcrumb/breadcrumb';


class Navbar extends Component<{history: any}, {toggle: boolean}> {
  constructor(props:any) {
    super(props)
    this.state = {
      toggle: false
    }

    this.onClickToggleMenu = this.onClickToggleMenu.bind(this)
    this.onClickUpload = this.onClickUpload.bind(this)
    this.onWindowClick = this.onWindowClick.bind(this)
  }
  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
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
    return (
      <div className="nav-header">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light">
          <Link to='/' className="navbar-brand" style={{paddingLeft: "1.5rem"}}>nickipedia</Link>
          <div className="collapse navbar-collapse">
          </div>
          <button type="button" className="btn" id="btn-control" style={{marginRight: "1.5rem", border: "none"}} onClick={this.onClickUpload}>
            <Octicon icon={FileDirectory} size="medium" />
          </button>
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
