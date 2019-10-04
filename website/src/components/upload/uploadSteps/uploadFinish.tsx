import React, { Component } from 'react'
import { IoMdCloudDone } from 'react-icons/io'
import { IconContext } from 'react-icons'
import cx from 'classnames'

import './../upload.scss'

interface ReadOnly {
  uploadStatus: boolean,
  validateSteps: () => boolean,
  addInfo: () => Promise<void>
}


export default class UploadFinish extends Component<ReadOnly> {
  constructor(props: Readonly<ReadOnly>) {
    super(props)
  }
  render() {

    const { uploadStatus, validateSteps, addInfo } = this.props

    return (
      <div className="toggle-upload-method">
        <div className="upload-icon">
          <IconContext.Provider value={{size: "100px"}}>
            <IoMdCloudDone style={{paddingBottom: "5px", color: "#969595"}}/>
          </IconContext.Provider>
        </div>
        <button className={cx("upload-button", {["upload-button--success"]: Boolean(uploadStatus)}, {["upload-button--disabled"]: Boolean(!validateSteps)})} onClick={addInfo}>{uploadStatus ? 'Success': 'Upload'}</button>
      </div>
    )
  }
}
