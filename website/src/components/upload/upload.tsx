import React, { Component } from 'react'
import cx from 'classnames'

import './upload.scss'

import UploadMethod from './uploadSteps/uploadMethod'
import ProcessLink from './uploadSteps/processLink'
import ProcessFile from './uploadSteps/processFile'
import UploadMetadata from './uploadSteps/UploadMetadata'
import UploadOptionalData from './uploadSteps/uploadOptionalData'
import UploadFinish from './uploadSteps/uploadFinish'


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
  processProgressVideoUpload?: number,
  processProgressThumbnail?: number,
  title?: string,
  description?: string,
  id?: number,
  step?: number,
  uploadMethod?: string,
  selectedImage?: number,
  originalAuthor?: string,
  originalViews?: string,
  hashtags?: string,
  drag?: boolean
}

const UPLOAD_TAB_CLASS = 'toggle-upload-header-navbar-steps'
const FORM_BUTTON_CLASS = 'upload-form-confirm-button'

const initialState = {
  url: '',
  loading: false,
  error: '',
  processStatus: false,
  uploadStatus: false,
  processProgressVideoUpload: 0,
  processProgressThumbnail: 0,
  step: 1,
  uploadMethod: 'file',
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

  constructor(props:any) {
    super(props)
    this.state = initialState
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

  private processThumbnail = async (file: File): Promise<void> => {
    const access_token = localStorage.getItem('access_token')
    const { id } = this.state
    const request = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', file)

    if (this.validateForm()) {
      this.setState({loading: true, error: ''})
      try {

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 201) {
            this.setState({loading: false})
          }
          if (request.readyState === 4 && request.status !== 201) {
            this.setState({loading: false, error: request.statusText})
            throw this.state.error
          }
        }

        request.upload.onprogress = this.updateProgress
        request.open('PUT', 'api/video/thumbnail?id=' + id, true)
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
      if (this.state.step === 2) {
        this.setState({processProgressVideoUpload: percent})
      }
      if (this.state.step === 3) {
        this.setState({processProgressThumbnail: percent})
      }
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
            hashtags: this.state.hashtags,
            public: true
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

  onFileSelected = (event: any) => {
    const { step } = this.state
    console.log(event.target.files[0])
    if (step === 2) {
      this.processFile(event.target.files[0])
    }
    if (step === 3) {
      this.processThumbnail(event.target.files[0])
    }
  }

  setUploadMethod = (method: string): void => {
    this.setState({uploadMethod: method})
  }

  updateSelectedThumbnail = (pictureId: number) => {
    this.setState({selectedImage: pictureId})
  }

  render() {
    const { step,
            uploadMethod,
            url,
            loading,
            selectedImage,
            error,
            uploadStatus,
            processProgressVideoUpload,
            processProgressThumbnail,
            drag,
            title,
            description,
            originalAuthor,
            originalViews,
            hashtags
          } = this.state

    const classNameTab = UPLOAD_TAB_CLASS
    const selectedClassNameTab = UPLOAD_TAB_CLASS + '--selected'
    const disabledClassNameTab = UPLOAD_TAB_CLASS + '--disabled'
    const classNameButton = FORM_BUTTON_CLASS
    const disabledClassNameButton = FORM_BUTTON_CLASS + '--disabled'

    let renderStep: any

    switch (step) {
      case 1:

        renderStep = <UploadMethod setUploadMethod={this.setUploadMethod} uploadMethod={uploadMethod}/>

        break
      case 2:
        if (uploadMethod === 'link') {
          renderStep = <ProcessLink url={url} updateLink={this.onChange} loading={loading} processLink={this.processLink}/>
        }
        if (uploadMethod === 'file') {
          renderStep = <ProcessFile dragOverFile={this.dragOverFile} dragLeaveFile={this.dragLeaveFile} dropFile={this.dropFile} onFileSelected={this.onFileSelected} process={processProgressVideoUpload} drag={drag}/>
        }
        break
      case 3:
        renderStep = <UploadMetadata title={title} description={description} onFileSelected={this.onFileSelected} updateInput={this.onChange} selectedImage={selectedImage} processProgressThumbnail={processProgressThumbnail} updateSelectedThumbnail={this.updateSelectedThumbnail}/>
        break
      case 4:
        renderStep = <UploadOptionalData originalAuthor={originalAuthor} originalViews={originalViews} hashtags={hashtags} updateInput={this.onChange} />
        break

      case 5:
        renderStep = <UploadFinish uploadStatus={uploadStatus} validateSteps={this.validateSteps} addInfo={this.addInfo} />
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
