import React, {Component} from 'react';
import bsCustomFileInput from 'bs-custom-file-input';

import './upload.scss'

import Loading from './../loading/loading';


class Upload extends Component<{}, {url?: string, loading?: boolean, urlMessage?: string, uploadStatus?: boolean, title?: string, description?: string, id?: number}> {
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
    }
    this.onChange = this.onChange.bind(this)
    this.submitUploadForm = this.submitUploadForm.bind(this)
    this.validateForm = this.validateForm.bind(this)
    this.submitRevisionForm = this.submitRevisionForm.bind(this)
  }
  componentDidMount() {
    bsCustomFileInput.init()
  }
  onChange(event:React.ChangeEvent<HTMLInputElement>): void {
    this.setState({[event.target.name]: event.target.value})
  }
  validateForm() {
    return true
  }
  submitUploadForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
    const access_token = sessionStorage.getItem('access_token')
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
            form.reset()
            console.log('success')
            console.log(data)
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
  submitRevisionForm(event:React.FormEvent<HTMLFormElement>): any {
    var form = event.target as HTMLFormElement;
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
            this.setState({loading: false, uploadStatus: false, urlMessage: 'video successfully updated', url: ''})
            form.reset()
            console.log('success')
            console.log(data)
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

  render() {
    const upload = (
      <div className="card-body">
        <h5 className="card-title">upload</h5>
        <div style={{padding: "1rem", fontSize: "18px"}}>{this.state.urlMessage}</div>
        <p className="card-text">upload a video on nickipedia.</p>
        <form onSubmit={this.submitUploadForm}>
          <div className="form-group input-group-lg" style={{padding: "3rem"}}>
            <input className="form-control from-control-lg" type="text" name="url" autoFocus value={this.state.url} onChange={this.onChange} placeholder="url"/>
          </div>
          <button type="submit" style={{display: "none"}}></button>
          <Loading loading={this.state.loading}/>
        </form>
      </div>
    )
    const revision = (
      <div className="card-body">
        <h5 className="card-title">upload</h5>
        <div style={{padding: "2rem", fontSize: "18px"}}>{this.state.urlMessage}</div>
        <p className="card-text" style={{paddingTop: "2rem"}}>are all fields correct?</p>
        <form onSubmit={this.submitRevisionForm}>
          <div className="form-group input-group-lg" style={{padding: "3rem"}}>
            <input className="form-control from-control-lg" type="text" name="title" autoFocus value={this.state.title} onChange={this.onChange} placeholder="title"/>
          </div>
          <div className="form-group input-group-lg" style={{padding: "3rem"}}>
            <input className="form-control from-control-lg" type="text" name="description" value={this.state.description} onChange={this.onChange} placeholder="description"/>
          </div>
          <button type="submit" style={{display: "none"}}></button>
          <Loading loading={this.state.loading}/>
        </form>
      </div>
    )
    const formToRender = this.state.uploadStatus === false ? upload : revision
    return (
      <div className="card" style={{textAlign: "center", border: "2px solid #505458", width: "90%", marginTop: "1.5rem", marginLeft: "auto", marginRight: "auto", boxShadow: "1px 1px 0 1px #ccc"}}>
        {formToRender}
      </div>
    )
  }
}


export default Upload;
