import React, { Component, ReactNode } from 'react'

import './../upload.scss'

interface Props {
  originalAuthor: string,
  originalViews: string,
  hashtags: string,
  updateInput: (event: any) => void
}


export default class UploadOptionalData extends Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props)
  }
  public render = (): ReactNode => {

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
