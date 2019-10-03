import React, { Component } from 'react'
import { IoMdCloudUpload, IoMdCloudDone, IoMdFolder, IoMdFolderOpen } from 'react-icons/io'
import { IconContext } from "react-icons"
import cx from 'classnames'

import './upload.scss'

import Loading from './../loading/loading'


interface ReadOnly {
  style: any,
  reference: any
}

interface WriteOnly {
  url?: string,
  loading?: boolean,
  error?: string,
  processStatus?: boolean,
  uploadStatus?: boolean,
  processProgress?: number,
  title?: string,
  description?: string,
  id?: number,
  step?: number,
  uploadMethod?: string,
  selectedUploadForm?: boolean,
  selectedImage?: number,
  originalAuthor?: string,
  originalViews?: string,
  hashtags?: string,
  drag?: boolean
}

const UPLOAD_TAB_CLASS = 'toggle-upload-header-navbar-steps'
const FORM_BUTTON_CLASS = 'upload-form-confirm-button'
const UPLOAD_SELECT_CLASS = 'upload-select'

const initialState = {
  url: '',
  loading: false,
  error: '',
  processStatus: false,
  uploadStatus: false,
  processProgress: 0,
  step: 1,
  uploadMethod: 'file',
  selectedUploadForm: false,
  selectedImage: 1,
  id: 0,
  title: '',
  description: '',
  originalAuthor: '',
  originalViews: '',
  hashtags: '',
  drag: false
}


class Upload extends Component<ReadOnly, WriteOnly> {

  fileInput: any

  constructor(props:any) {
    super(props)
    this.state = initialState
  }

  fileInputRef = (fileInput: any): void => {
    this.fileInput = fileInput
  }

  private onChange = (event: { target: { name: any, value: any } }): void => {
    this.setState({[event.target.name]: event.target.value})
  }

  private nextStep = (): void => {
    const { step } = this.state
    this.setState({step: step + 1})
  }

  private prevStep = (): void => {
    const { step } = this.state
    this.setState({step: step - 1, error: ''})
  }

  private validateForm = (): boolean => {
    return true
  }

  private validateSteps = (): boolean => {
    const { step, uploadMethod, processStatus, title, description } = this.state

    switch(step) {
      case 1:
        if (uploadMethod === '') {
          return false
        }
        else return true

      case 2:
        if (!processStatus) {
          return false
        }
        else {
          return true
        }

      case 3:
        if (title === '' || description === '') {
          return false
        }
        else {
          return true
        }
      case 4:

        return true

      case 5:

        return true
    }
  }

  private processLink = async (): Promise<void> => {
    const access_token = localStorage.getItem('access_token')
    if (this.validateForm()) {
      this.setState({loading: true, error: ''})
      try {
        const response = await fetch('api/video/add_from_url?url=' + this.state.url, {
          headers: new Headers({
            "Authorization": access_token
          })
        })
        if (!response.ok) {
          this.setState({loading: false, error: response.status + ' ' + response.statusText})
          throw this.state.error
        }
        const data = await response.json()
        this.setState({
          loading: false,
          title: data.title,
          description: data.text,
          originalAuthor: data.original_author,
          originalViews: data.original_views,
          id: data.id,
          processStatus: true
        })
        this.nextStep()
      }
      catch (error) {
        this.setState({loading: false, error: error})
      }
    }
  }

  private processFile = async (file: File): Promise<void> => {
    const access_token = localStorage.getItem('access_token')
    const request = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', file)

    if (this.validateForm()) {
      this.setState({loading: true, error: ''})
      try {

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 201) {
            let data = JSON.parse(request.response)
            this.setState({loading: false, id: data.id, processStatus: true})
            this.nextStep()
          }
          if (request.readyState === 4 && request.status !== 201) {
            this.setState({loading: false, error: request.statusText})
            throw this.state.error
          }
        }

        request.upload.onprogress = this.updateProgress
        request.open('POST', 'api/video/add_from_file', true)
        request.setRequestHeader("Authorization", access_token)
        request.onerror = () => {
          this.setState({loading: false, error: request.statusText})
          throw this.state.error
        }
        request.send(formData)
      }
      catch (error) {
        this.setState({loading: false, error: error})
      }
    }
  }

  updateProgress = (event: { lengthComputable: any, loaded: number, total: number }) => {
    if (event.lengthComputable) {
      let percent = (event.loaded / event.total) * 100
      this.setState({processProgress: percent})
    }
  }

  private addInfo = async (): Promise<void> => {
    const access_token = sessionStorage.getItem('access_token')
    if (this.validateForm()) {
      this.setState({loading: true})
      try {
        const response = await fetch('api/video?video_id=' + this.state.id, {
          method: 'put',
          headers: new Headers({
            "Authorization": access_token,
            "Content-Type": "application/json"
          }),
          body: JSON.stringify({
            title: this.state.title,
            text: this.state.description,
            original_author: this.state.originalAuthor,
            original_views: this.state.originalViews,
            hashtags: this.state.hashtags
          })
        })
        if (!response.ok) {
          this.setState({loading: false, error: response.status + ' ' + response.statusText})
          throw this.state.error
        }
        this.setState({ loading: false, url: '', uploadStatus: true })
      }
      catch (error) {
        this.setState({loading: false, error: error})
      }
    }
  }

  dragOverFile = (event: any) => {
    event.preventDefault()
    this.setState({drag: true})
  }

  dragLeaveFile = (event: any) => {
    event.preventDefault()
    this.setState({drag: false})
  }

  dropFile = (event: any) => {
    event.preventDefault()
    this.processFile(event.dataTransfer.files[0])
  }
  getInputFile = () => {
    this.fileInput.click()
  }

  renderUploadSelection = () => {
    const { uploadMethod } = this.state

    switch (uploadMethod) {
      case 'link':
        return 'Link Upload'

      case 'file':
        return 'File Upload'

      case '':
        return ''
    }
  }

  renderFileUploadIcon = () => {
    const { drag } = this.state

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

  render() {
    const { step, selectedUploadForm, uploadMethod, url, loading, selectedImage, error, uploadStatus, processProgress } = this.state
    const classNameTab = UPLOAD_TAB_CLASS
    const selectedClassNameTab = UPLOAD_TAB_CLASS + '--selected'
    const disabledClassNameTab = UPLOAD_TAB_CLASS + '--disabled'
    const classNameButton = FORM_BUTTON_CLASS
    const disabledClassNameButton = FORM_BUTTON_CLASS + '--disabled'
    const classNameSelect = UPLOAD_SELECT_CLASS
    const selectedClassNameSelect = UPLOAD_SELECT_CLASS + '--selected'

    let renderStep: any

    switch (step) {
      case 1:
        renderStep = (
          <div className="toggle-upload-method">
            <div className="upload-icon">
              <IconContext.Provider value={{size: "100px"}}>
                <IoMdCloudUpload style={{paddingBottom: "5px", color: "#969595"}}/>
              </IconContext.Provider>
            </div>
            <h1>Choose between Link and File Upload</h1>
            <div className={cx(classNameSelect, {[selectedClassNameSelect]: selectedUploadForm})} onClick={() => this.setState({selectedUploadForm: !selectedUploadForm})}>
              <div className="upload-select-input">
                <span>{this.renderUploadSelection()}</span>
              </div>
              <div className="upload-select-options">
                <ul>
                  <li onClick={() => this.setState({uploadMethod: 'link'})}>Link Upload</li>
                  <hr />
                  <li onClick={() => this.setState({uploadMethod: 'file'})}>File Upload</li>
                </ul>
              </div>
            </div>
          </div>
        )
        break
      case 2:
        if (uploadMethod === 'link') {
          renderStep = (
            <form onSubmit={(event) => event.preventDefault()}>
              <div className="upload-form-group" data-placeholder="Url (required)">
                <input type="text" name="url" autoFocus value={this.state.url} onChange={this.onChange} />
              </div>
              <button type="button" className={cx('process-button', {['process-button--disabled']: Boolean(url.length < 1)})} onClick={this.processLink}>{loading ? <Loading loading={loading}/> : 'Process'}</button>
              <div className="link-upload-status">
                <div className="link-upload-status-fill" />
              </div>
            </form>
          )
        }
        if (uploadMethod === 'file') {
          renderStep = (
            <div className="file-upload" onDragOver={this.dragOverFile} onDragLeave={this.dragLeaveFile} onDrop={this.dropFile}>
              <div className="file-upload-console">
                <div className="file-upload-icon">
                  {this.renderFileUploadIcon()}
                </div>
                <h1>Drag and drop a file that you want to upload</h1>
                <input type="file" style={{display: "none"}} ref={this.fileInputRef}/>
                <button className="select-file-button" onClick={this.getInputFile}>Select File</button>
                <div className="file-upload-status">
                  <div className="file-upload-status-fill" style={{width: processProgress + '%'}}/>
                </div>
              </div>
            </div>
          )
        }
        break
      case 3:
        renderStep = (
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="upload-form-group" data-placeholder="Title (required)">
              <textarea className="upload-form-textarea upload-form-textarea-title" name="title" autoFocus value={this.state.title} onChange={this.onChange} />
            </div>
            <div className="upload-form-group" data-placeholder="Description (required)">
              <textarea className="upload-form-textarea upload-form-textarea-description" name="description" value={this.state.description} onChange={this.onChange} />
            </div>
            <div className="thumbnail-header">
             <h1>Thumbnail</h1>
             <div className="thumbnail-slideshow">
                <img className={cx('thumbnail-preview', {['thumbnail-preview--selected']: Boolean(selectedImage === 1)})} src="media/default/background.jpg" onClick={() => this.setState({selectedImage: 1})}/>
                <img className={cx('thumbnail-preview', {['thumbnail-preview--selected']: Boolean(selectedImage === 2)})} src="media/default/background.jpg" onClick={() => this.setState({selectedImage: 2})}/>
                <img className={cx('thumbnail-preview', {['thumbnail-preview--selected']: Boolean(selectedImage === 3)})} src="media/default/background.jpg" onClick={() => this.setState({selectedImage: 3})}/>
             </div>
            </div>
          </form>
        )
        break
      case 4:
        renderStep = (
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="upload-form-group" data-placeholder="Original author (optional)">
              <input name="originalAuthor" autoFocus value={this.state.originalAuthor} onChange={this.onChange} />
            </div>
            <div className="upload-form-group" data-placeholder="Original views (optional)">
              <input name="originalViews" value={this.state.originalViews} onChange={this.onChange} />
            </div>
            <div className="upload-form-group" data-placeholder="Hashtags (optional)">
              <textarea className="upload-form-textarea upload-form-textarea-hashtags" name="hashtags" value={this.state.hashtags} onChange={this.onChange} />
            </div>
          </form>
        )
        break

      case 5:
        renderStep = (
          <div className="toggle-upload-method">
            <div className="upload-icon">
              <IconContext.Provider value={{size: "100px"}}>
                <IoMdCloudDone style={{paddingBottom: "5px", color: "#969595"}}/>
              </IconContext.Provider>
            </div>
            <button className={cx("upload-button", {["upload-button--success"]: Boolean(uploadStatus)})} onClick={this.addInfo}>{uploadStatus ? 'Success': 'Upload'}</button>
          </div>
        )
        break

    }
    return (
      <div className="toggle-upload-modal" style={this.props.style} ref={this.props.reference}>
        <div className="toggle-upload-content">
          <div className="toggle-upload-header">
            <h1>Upload video</h1>
            <div className="toggle-upload-header-navbar">
              <span className={cx(classNameTab, {[selectedClassNameTab]: Boolean(step==1)}, {[disabledClassNameTab]: Boolean(false)})} onClick={() => this.setState({step: 1})}>
                <span className="toggle-upload-header-navbar-steps-number">
                 1
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Upload form
                </span>
              </span>
              <span className={cx(classNameTab, {[selectedClassNameTab]: Boolean(step==2)}, {[disabledClassNameTab]: Boolean(false)})} onClick={() => this.setState({step: 2})}>
                <span className="toggle-upload-header-navbar-steps-number">
                  2
               </span>
               <span className="toggle-upload-header-navbar-steps-description">
                Source
               </span>
              </span>
              <span className={cx(classNameTab, {[selectedClassNameTab]: Boolean(step==3)}, {[disabledClassNameTab]: Boolean(false)})} onClick={() => this.setState({step: 3})}>
                <span className="toggle-upload-header-navbar-steps-number">
                  3
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Basic Info
                </span>
              </span>
              <span className={cx(classNameTab, {[selectedClassNameTab]: Boolean(step==4)}, {[disabledClassNameTab]: Boolean(false)})} onClick={() => this.setState({step: 4})}>
                <span className="toggle-upload-header-navbar-steps-number">
                  4
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Advanced Settings
                </span>
              </span>
              <span className={cx(classNameTab, {[selectedClassNameTab]: Boolean(step==5)}, {[disabledClassNameTab]: Boolean(false)})} onClick={() => this.setState({step: 5})}>
                <span className="toggle-upload-header-navbar-steps-number">
                  5
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Publish
                </span>
              </span>
            </div>
          </div>
          <hr />
          <div className="toggle-upload-form">
            {renderStep}
          </div>
          <hr />
          <div className="toggle-upload-footer">
            <button type="button" className={cx(classNameButton, {[disabledClassNameButton]: Boolean(step==1)})} onClick={this.prevStep}>Back</button>
            <div className="upload-console-error">{error}</div>
            <button type="button" className={cx(classNameButton, {[disabledClassNameButton]: Boolean(step==5 || !this.validateSteps())})} onClick={this.nextStep}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Upload;
