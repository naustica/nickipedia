import React, { Component, ReactNode } from 'react'
import { IoMdFolder, IoMdFolderOpen } from 'react-icons/io'
import { IconContext } from 'react-icons'
import cx from 'classnames'

import './../upload.scss'


interface Props {
  dragOverFile: (event: any) => void,
  dragLeaveFile: (event: any) => void,
  dropFile: (event: any) => void,
  onFileSelected: (event: any) => void,
  process: number,
  drag: boolean
}


export default class ProcessFile extends Component<Props> {

  private fileInput: any

  constructor(props: Readonly<Props>) {
    super(props)
  }

  private fileInputRef = (fileInput: any): void => {
    this.fileInput = fileInput
  }

  private getInputFile = (): void => {
    this.fileInput.click()
  }

  private renderFileUploadIcon = (): ReactNode => {
    const { drag } = this.props

    if (drag) {
      return (
        <IconContext.Provider value={{size: "100px"}}>
          <IoMdFolderOpen style={{paddingBottom: "5px", color: "#969595"}}/>
        </IconContext.Provider>
      )
    }
    else {
      return (
        <IconContext.Provider value={{size: "100px"}}>
          <IoMdFolder style={{paddingBottom: "5px", color: "#969595"}}/>
        </IconContext.Provider>
      )
    }
  }

  public render = (): ReactNode => {

    const { dragOverFile, dragLeaveFile, dropFile, process, onFileSelected } = this.props

    return (
      <div className="file-upload" onDragOver={dragOverFile} onDragLeave={dragLeaveFile} onDrop={dropFile}>
        <div className="file-upload-console">
          <div className="file-upload-icon">
            {this.renderFileUploadIcon()}
          </div>
          <h1>Drag and drop a file that you want to upload</h1>
          <input type="file" style={{display: "none"}} ref={this.fileInputRef} onChange={onFileSelected}/>
          <button className={cx('select-file-button', {['select-file-button--disabled']: Boolean(process > 0 && process <= 100)})} onClick={this.getInputFile}>Select File</button>
          <div className="file-upload-status">
            <div className="file-upload-status-fill" style={{width: process + '%'}}/>
          </div>
        </div>
      </div>
    )
  }
}
