import React, { Component } from 'react'
import { IoMdCloudUpload } from 'react-icons/io'
import { IconContext } from 'react-icons'
import cx from 'classnames'

import './../upload.scss'

interface ReadOnly {
  uploadMethod: string,
  setUploadMethod: (arg: string) => void
}

interface WriteOnly {
  selectedUploadForm: boolean
}


export default class UploadMethod extends Component<ReadOnly, WriteOnly> {
  constructor(props: Readonly<ReadOnly>) {
    super(props)
    this.state = {
      selectedUploadForm: false
    }
  }

  renderUploadSelection = () => {
    const { uploadMethod } = this.props

    switch (uploadMethod) {
      case 'link':
        return 'Link Upload'

      case 'file':
        return 'File Upload'

      case '':
        return ''
    }
  }

  render() {

    const { selectedUploadForm } = this.state
    const { setUploadMethod } = this.props

    return (
      <div className="toggle-upload-method">
        <div className="upload-icon">
          <IconContext.Provider value={{size: "100px"}}>
            <IoMdCloudUpload style={{paddingBottom: "5px", color: "#969595"}}/>
          </IconContext.Provider>
        </div>
        <h1>Choose between Link and File Upload</h1>
        <div className={cx("upload-select", {["upload-select--selected"]: selectedUploadForm})} onClick={() => this.setState({selectedUploadForm: !selectedUploadForm})}>
          <div className="upload-select-input">
            <span>{this.renderUploadSelection()}</span>
          </div>
          <div className="upload-select-options">
            <ul>
              <li onClick={() => setUploadMethod('link')}>Link Upload</li>
              <hr />
              <li onClick={() => setUploadMethod('file')}>File Upload</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
