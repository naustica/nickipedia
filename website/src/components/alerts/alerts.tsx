import React, { Component } from 'react';


import './alerts.scss';


class Alerts extends Component<{ message?: string }, {}> {
    constructor(props:any) {
      super(props)
    }
    render() {
      return (
          <div id="flash-message" className="alert alert-warning" role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span className="dismiss-flash" aria-hidden="true">&times;</span>
            </button>
            {this.props.message}
          </div>
      )
    }

}


export default Alerts
