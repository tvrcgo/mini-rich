import React from 'react'

export default class Video extends React.Component {

  handleClick = () => {
    const { editor } = this.props
    const url = prompt('Video source url', '')
    if (url && editor) {
      editor.insertVideo(url)
    }
  }

  render() {
    const { title } = this.props
    return (
      <a className='mark-video' onClick={this.handleClick} >{title}</a>
    )
  }
}
