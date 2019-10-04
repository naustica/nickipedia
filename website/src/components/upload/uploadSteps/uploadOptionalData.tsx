import React, { Component } from 'react'

import './../upload.scss'

interface ReadOnly {
  originalAuthor: string,
  originalViews: string,
  hashtags: string,
  updateInput: (event: any) => void
}


export default class UploadOptionalData extends Component<ReadOnly> {
  constructor(props: Readonly<ReadOnly>) {
    super(props)
  }
  render() {

    const { originalAuthor, originalViews, hashtags, updateInput } = this.props

    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="upload-form-group" data-placeholder="Original author (optional)">
          <input name="originalAuthor" autoFocus value={originalAuthor} onChange={updateInput} />
        </div>
        <div className="upload-form-group" data-placeholder="Original views (optional)">
          <input name="originalViews" value={originalViews} onChange={updateInput} />
        </div>
        <div className="upload-form-group" data-placeholder="Hashtags (optional)">
          <textarea className="upload-form-textarea upload-form-textarea-hashtags" name="hashtags" value={hashtags} onChange={updateInput} />
        </div>
      </form>
    )
  }
}
