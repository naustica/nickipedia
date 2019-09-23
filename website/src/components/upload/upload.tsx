import React, {Component} from 'react'
import { IoIosLink, IoIosCloudUpload } from 'react-icons/io'
import { IconContext } from "react-icons"

import './upload.scss'

import Loading from './../loading/loading'


class Upload extends Component<{}, {url?: string, loading?: boolean, urlMessage?: string, uploadStatus?: boolean, title?: string, description?: string, id?: number, step?: number, uploadVia?: string}> {
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

    switch (step) {
      case 1:
        return (
          <div className="upload-form">
            <div className="upload-form-header">
              <h1>UPLOAD A VIDEO</h1>
            </div>
            <div className="upload-form-body">
              <div className="upload-form-link" onClick={this.nextStep}>
                <button type="button" className="btn" id="btn-upload-link">
                  <IconContext.Provider value={{size: "32px"}}>
                    <IoIosLink />
                  </IconContext.Provider>
                </button>
                <h1>UPLOAD VIA LINK</h1>
              </div>
              <div className="upload-form-file" onClick={this.nextStep}>
                <button type="button" className="btn" id="btn-upload-file">
                  <IconContext.Provider value={{size: "32px"}}>
                    <IoIosCloudUpload />
                  </IconContext.Provider>
                </button>
                <h1>UPLOAD VIA FILE</h1>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="upload-form">
            <div className="upload-form-header">
              <h1>UPLOAD A VIDEO - URL</h1>
            </div>
            <div className="upload-form-body">
              <form style={{width: "90%"}}>
                <div className="upload-form-error">{this.state.urlMessage}</div>
                <div className="form-group input-group-lg">
                  <input className="form-control from-control-lg" type="text" name="url" style={{border: "2px solid #505458"}} autoFocus value={this.state.url} onChange={this.onChange} placeholder="url"/>
                </div>
                <div className="form-submit">
                  <button type="button" className="submit-button" onClick={this.prevStep}>GO BACK</button>
                  <button type="button" className="submit-button" onClick={this.submitUploadForm}>CONTINUE</button>
                </div>
                <Loading loading={this.state.loading}/>
              </form>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="upload-form">
            <div className="upload-form-header">
              <h1>UPLOAD A VIDEO - Update</h1>
            </div>
            <div className="upload-form-body">
              <form style={{width: "90%"}}>
                <div className="upload-form-error">{this.state.urlMessage}</div>
                <div className="form-group input-group-lg" style={{padding: "3rem"}}>
                  <input className="form-control from-control-lg" type="text" name="title" style={{border: "1px solid #505458"}} autoFocus value={this.state.title} onChange={this.onChange} placeholder="title"/>
                </div>
                <div className="form-group input-group-lg" style={{padding: "3rem"}}>
                  <input className="form-control from-control-lg" type="text" name="description" style={{border: "1px solid #505458"}} value={this.state.description} onChange={this.onChange} placeholder="description"/>
                </div>
                <div className="form-submit">
                  <button type="button" className="submit-button" onClick={this.prevStep}>GO BACK</button>
                  <button type="button" className="submit-button" onClick={this.submitRevisionForm}>DONE</button>
                </div>
                <Loading loading={this.state.loading}/>
              </form>
            </div>
          </div>
        )
    }
  }
}


export default Upload;
