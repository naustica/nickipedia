import React, {Component} from 'react';


class Loading extends Component<{loading: boolean},{}> {
  constructor(props:any) {
    super(props)
  }
  render() {
    if (this.props.loading) {
      return (
        <div className="text-center" style={{textAlign: "center"}}>
          <div className="spinner-border" role="status">
          </div>
        </div>
      )
    }
    else {
      return (
        <div></div>
      )
    }
  }
}


export default Loading