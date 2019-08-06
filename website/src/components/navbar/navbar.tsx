import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import Octicon, {FileDirectory, Bell, Gear} from '@primer/octicons-react';

import './navbar.scss';

import Breadcrumb from './../breadcrumb/breadcrumb';


class Navbar extends Component<{history: any}, {}> {
  constructor(props:any) {
    super(props)

    this.onClickLogout = this.onClickLogout.bind(this)
    this.onClickUpload = this.onClickUpload.bind(this)
  }
  onClickLogout(event:React.MouseEvent<HTMLButtonElement>): any {
    this.props.history.push('/logout')
  }
  onClickUpload(event:React.MouseEvent<HTMLButtonElement>): any {
    this.props.history.push('/upload')
  }
  render() {
    return (
      <div className="nav-header">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to='/' className="navbar-brand" style={{paddingLeft: "1.5rem"}}>nickipedia</Link>
          <div className="collapse navbar-collapse">
          </div>
          <form className="form-inline">
            <button type="button" className="btn" id="btn-control" style={{marginRight: "1.5rem", border: "none"}} onClick={this.onClickUpload}>
              <Octicon icon={FileDirectory} size="medium" />
            </button>
            <button type="button" className="btn" id="btn-control" style={{marginRight: "1.5rem", border: "none"}} onClick={this.onClickLogout}>
              <Octicon icon={Gear} size="medium" />
            </button>
          </form>
        </nav>
      </header>
    </div>
  )
  }
}


export default withRouter(Navbar);
