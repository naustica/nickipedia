import React, {Component} from 'react'
import { IoMdLink, IoMdCloudUpload } from 'react-icons/io'
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
  urlMessage?: string,
  uploadStatus?: boolean,
  title?: string,
  description?: string,
  id?: number,
  step?: number,
  uploadVia?: string,
  selectedUploadForm?: boolean,
  selectedImage?: number,
  originalAuthor?: string,
  originalViews?: string,
  hashtags?: string
}

const UPLOAD_TAB_CLASS = 'toggle-upload-header-navbar-steps'
const FORM_BUTTON_CLASS = 'upload-form-confirm-button'
const UPLOAD_SELECT_CLASS = 'upload-select'


class Upload extends Component<ReadOnly, WriteOnly> {
  constructor(props:any) {
    super(props)
    this.state = {
      url: '',
      loading: false,
      urlMessage: '',
      uploadStatus: false,
      id: 0,
      title: '',
      description: '',
      step: 1,
      uploadVia: '',
      selectedUploadForm: false,
      selectedImage: 1,
      originalAuthor: '',
      originalViews: '',
      hashtags: ''
    }
    this.submitUploadForm = this.submitUploadForm.bind(this)
    this.submitRevisionForm = this.submitRevisionForm.bind(this)
  }

  private onChange = (event: any): void => {
    this.setState({[event.target.name]: event.target.value})
  }

  private nextStep = (): void => {
    const { step } = this.state
    this.setState({step: step + 1})
  }

  private prevStep = (): void => {
    const { step } = this.state
    this.setState({step: step - 1, urlMessage: '', url: '', loading: false})
  }

  validateForm = () => {
    return true
  }

  validateSteps = () => {
    const { step, uploadVia, uploadStatus, title, description } = this.state

    switch(step) {
      case 1:
        if (uploadVia === '') {
          return false
        }
        else return true

      case 2:
        if (!uploadStatus) {
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
    }
  }

  submitUploadForm(event: any): any {
    //var form = event.target as HTMLFormElement;
    const access_token = localStorage.getItem('access_token')
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({loading: true, urlMessage: ''})
      fetch('api/video/add_from_url?url=' + this.state.url, {
        headers: new Headers({
          "Authorization": access_token
        })
      })
        .then ((response => {
          const status = response.status
          const data = response.json()
          return Promise.all([status, data])
        }))
        .then(([status, data]) => {
          if (status === 201) {
            this.setState({loading: false, urlMessage: 'video successfully uploaded', title: data.title, description: data.text, id: data.id, uploadStatus: true})
            this.nextStep()
            //form.reset()
          }
          else {
            this.setState({loading: false, urlMessage: 'api call error'})
            console.log(status)
          }
          })
          .catch(error => {
            console.log(error)
          })
      }
  }
  submitRevisionForm(event: any): any {
    //var form = event.target as HTMLFormElement;
    const access_token = sessionStorage.getItem('access_token')
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({loading: true})
      fetch('api/video?video_id=' + this.state.id, {
        method: 'put',
        headers: new Headers({
          "Authorization": access_token,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({title: this.state.title, text: this.state.description})
      })
        .then ((response => {
          const status = response.status
          const data = response.json()
          return Promise.all([status, data])
        }))
        .then(([status, data]) => {
          if (status === 201) {
            this.setState({
                loading: false,
                uploadStatus: false,
                urlMessage: 'video successfully updated',
                url: '',
                step: 1
              })
            //form.reset()
          }
          else {
            this.setState({loading: false, urlMessage: 'api call error'})
            console.log(status)
          }
          })
          .catch(error => {
            this.setState({loading: false})
            console.log(error)
          })
      }
  }

  renderUploadSelection = () => {
    const { uploadVia } = this.state

    switch (uploadVia) {
      case 'link':
        return 'Link Upload'

      case 'file':
        return 'File Upload'

      case '':
        return ''
    }
  }

  render() {
    const { step, selectedUploadForm, uploadVia, url, loading, selectedImage } = this.state
    const classNameTab = UPLOAD_TAB_CLASS
    const selectedClassNameTab = UPLOAD_TAB_CLASS + '--selected'
    const disabledClassNameTab = UPLOAD_TAB_CLASS + '--disabled'
    const classNameButton = FORM_BUTTON_CLASS
    const disabledClassNameButton = FORM_BUTTON_CLASS + '--disabled'
    const classNameSelect = UPLOAD_SELECT_CLASS
    const selectedClassNameSelect = UPLOAD_SELECT_CLASS + '--selected'

    let renderStep: any = (<div></div>)

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
                  <li onClick={() => this.setState({uploadVia: 'link'})}>Link Upload</li>
                  <hr />
                  <li onClick={() => this.setState({uploadVia: 'file'})}>File Upload</li>
                </ul>
              </div>
            </div>
          </div>
        )
        break
      case 2:
        if (uploadVia === 'link') {
          renderStep = (
            <form>
              <div className="upload-form-group" data-placeholder="Url (required)">
                <input type="text" name="url" autoFocus value={this.state.url} onChange={this.onChange} />
              </div>
              <button type="button" className={cx('upload-button', {['upload-button--disabled']: Boolean(url.length < 1)})} onClick={this.submitUploadForm}>{loading ? <Loading loading={loading}/> : 'Process'}</button>
            </form>
          )
        }
        if (uploadVia === 'file') {
          renderStep = (
            <div></div>
          )
        }
        break
      case 3:
        renderStep = (
          <form>
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
          <form>
            <div className="upload-form-group" data-placeholder="Original author (optional)">
              <textarea className="upload-form-textarea upload-form-textarea-original-author" name="original-author" autoFocus value={this.state.originalAuthor} onChange={this.onChange} />
            </div>
            <div className="upload-form-group" data-placeholder="Original views (optional)">
              <textarea className="upload-form-textarea upload-form-textarea-original-views" name="original-views" value={this.state.originalViews} onChange={this.onChange} />
            </div>
            <div className="upload-form-group" data-placeholder="Hashtags (optional)">
              <textarea className="upload-form-textarea upload-form-textarea-hashtags" name="hashtags" value={this.state.hashtags} onChange={this.onChange} />
            </div>
          </form>
        )
        break

      case 5:
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
            <button type="button" className={cx(classNameButton, {[disabledClassNameButton]: Boolean(step==1 || !this.validateSteps())})} onClick={this.prevStep}>Back</button>
            <button type="button" className={cx(classNameButton, {[disabledClassNameButton]: Boolean(step==5 || !this.validateSteps())})} onClick={this.nextStep}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Upload;
