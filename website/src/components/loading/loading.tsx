import React, { Component, ReactNode } from 'react'


interface Props {
  loading: boolean
}

export default class Loading extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  public render = (): ReactNode => {
    const { loading } = this.props
    if (loading) {
      return (
        <div className="text-center" style={{textAlign: "center"}}>
          <div className="loading-spinner">
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
