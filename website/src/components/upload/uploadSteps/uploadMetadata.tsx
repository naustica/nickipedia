import React, { Component } from 'react'
import cx from 'classnames'

import './../upload.scss'

interface ReadOnly {
  title: string,
  description: string,
  onFileSelected: (event: any) => void,
  updateInput: (arg: any) => void,
  selectedImage: number,
  processProgressThumbnail: number,
  updateSelectedThumbnail: (arg: number) => void
}


export default class UploadMetadata extends Component<ReadOnly> {

  fileInput: any

  constructor(props: Readonly<ReadOnly>) {
    super(props)
  }

  fileInputRef = (fileInput: any): void => {
    this.fileInput = fileInput
  }

  getInputFile = (): void => {
    this.fileInput.click()
  }

  render() {

    const { title, description, onFileSelected, updateInput, selectedImage, processProgressThumbnail, updateSelectedThumbnail  } = this.props

    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="upload-form-group" data-placeholder="Title (required)">
          <textarea className="upload-form-textarea upload-form-textarea-title" name="title" autoFocus value={title} onChange={updateInput} />
        </div>
        <div className="upload-form-group" data-placeholder="Description (required)">
          <textarea className="upload-form-textarea upload-form-textarea-description" name="description" value={description} onChange={updateInput} />
        </div>
        <div className="thumbnail-header">
         <h1>Thumbnail</h1>
         <div className="thumbnail-slideshow">
            <input type="file" style={{display: "none"}} ref={this.fileInputRef} onChange={onFileSelected}/>
            <div className={cx('thumbnail-upload', {['thumbnail-upload--selected']: Boolean(selectedImage === 1)}, {['thumbnail-upload--success']: Boolean(processProgressThumbnail === 100)})} onClick={this.getInputFile}>
              Custom thumbnail (only jpg)
              <div className="thumbnail-upload-status">
                <div className="thumbnail-upload-status-fill" style={{width: processProgressThumbnail + '%'}}/>
              </div>
            </div>
            <img className={cx('thumbnail-preview', {['thumbnail-preview--selected']: Boolean(selectedImage === 2)})} src="media/default/background.jpg" onClick={() => updateSelectedThumbnail(2)}/>
            <img className={cx('thumbnail-preview', {['thumbnail-preview--selected']: Boolean(selectedImage === 3)})} src="media/default/background.jpg" onClick={() => updateSelectedThumbnail(3)}/>
         </div>
        </div>
      </form>
    )
  }
}
