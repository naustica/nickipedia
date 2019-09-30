import React, {Component} from 'react'
import { IoMdLink, IoIosCloudUpload } from 'react-icons/io'
import { IconContext } from "react-icons"

import './upload.scss'

import Loading from './../loading/loading'


class Upload extends Component<{style: any, reference: any}, {url?: string, loading?: boolean, urlMessage?: string, uploadStatus?: boolean, title?: string, description?: string, id?: number, step?: number, uploadVia?: string}> {
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
      uploadVia: ''
    }
    this.submitUploadForm = this.submitUploadForm.bind(this)
    this.submitRevisionForm = this.submitRevisionForm.bind(this)
  }

  onChange = (event:React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({[event.target.name]: event.target.value})
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({step: step + 1})
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({step: step - 1, urlMessage: '', url: '', loading: false})
  }

  changeStep = (event: any): void => {
    if (event.target.id === 'upload-step-1') {
      this.setState({step: 1})
    }
    if (event.target.id === 'upload-step-2') {
      this.setState({step: 2})
    }
    if (event.target.id === 'upload-step-3') {
      this.setState({step: 3})
    }
    if (event.target.id === 'upload-step-4') {
      this.setState({step: 4})
    }
    if (event.target.id === 'upload-step-5') {
      this.setState({step: 5})
    }
  }

  validateForm = () => {
    return true
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

  render() {
    const { step } = this.state

    let renderStep: any = (<div></div>)

    switch (step) {
      case 1:
        renderStep = (
          <div className="toggle-upload-method">
            <div className="upload-method-card">
              <h1>Upload video via link</h1>
            </div>
            <div className="upload-method-card">
              <h1>Upload video via file</h1>
            </div>
          </div>
        )
        break
      case 2:
        renderStep = (
          <form>
            <div className="upload-form-group">
              <input type="text" name="url" autoFocus value={this.state.url} onChange={this.onChange} placeholder="url" />
              <span className="upload-form-border"/>
            </div>
          </form>
        )
        break
      case 3:
        renderStep = (
          <form>
            <div className="upload-form-group">
              <input type="text" name="title" autoFocus value={this.state.title} onChange={this.onChange} placeholder="title" />
              <span className="upload-form-border"/>
            </div>
            <div className="upload-form-group">
              <input type="text" name="description" autoFocus value={this.state.description} onChange={this.onChange} placeholder="description" />
              <span className="upload-form-border"/>
            </div>
          </form>
        )
        break

    }
    return (
      <div className="toggle-upload-modal" style={this.props.style} ref={this.props.reference}>
        <div className="toggle-upload-content">
          <div className="toggle-upload-header">
            <h1>Upload video</h1>
            <div className="toggle-upload-header-navbar">
              <span className="toggle-upload-header-navbar-steps" id="upload-step-1" onClick={this.changeStep}>
                <span className="toggle-upload-header-navbar-steps-number">
                 1
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Upload form
                </span>
              </span>
              <span className="toggle-upload-header-navbar-steps" id="upload-step-2" onClick={this.changeStep}>
                <span className="toggle-upload-header-navbar-steps-number">
                  2
               </span>
               <span className="toggle-upload-header-navbar-steps-description">
                Source
               </span>
              </span>
              <span className="toggle-upload-header-navbar-steps" id="upload-step-3" onClick={this.changeStep}>
                <span className="toggle-upload-header-navbar-steps-number">
                  3
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Basic Info
                </span>
              </span>
              <span className="toggle-upload-header-navbar-steps" id="upload-step-4" onClick={this.changeStep}>
                <span className="toggle-upload-header-navbar-steps-number">
                  4
                </span>
                <span className="toggle-upload-header-navbar-steps-description">
                 Advanced Settings
                </span>
              </span>
              <span className="toggle-upload-header-navbar-steps" id="upload-step-5" onClick={this.changeStep}>
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
            <button type="button" className="upload-form-confirm-button" onClick={this.prevStep}>Back</button>
            <button type="button" className="upload-form-confirm-button" onClick={this.nextStep}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}


export default Upload;
