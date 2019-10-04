import React, { Component } from 'react'
import cx from 'classnames'

import './../upload.scss'
import Loading from '../../loading/loading'

interface ReadOnly {
  url: string,
  updateLink: (arg: any) => void,
  loading: boolean,
  processLink: () => Promise<void>
}


export default class ProcessLink extends Component<ReadOnly> {
  constructor(props: Readonly<ReadOnly>) {
    super(props)
  }
  render() {

    const { url, updateLink, loading, processLink } = this.props

    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="upload-form-group" data-placeholder="Url (required)">
          <input type="text" name="url" autoFocus value={url} onChange={updateLink} />
        </div>
        <button type="button" className={cx('process-button', {['process-button--disabled']: Boolean(url.length < 1)})} onClick={processLink}>{loading ? <Loading loading={loading}/> : 'Process'}</button>
        <div className="link-upload-status">
          <div className="link-upload-status-fill" />
        </div>
      </form>
    )
  }
}
