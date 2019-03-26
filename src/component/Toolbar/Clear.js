import React from 'react'

export default class ClearFormats extends React.Component {

  handleClick = () => {
    const { editor } = this.props
    if (editor) {
      editor.clearMarks()
    }
  }

  render () {
    const { title } = this.props
    return (
      <a className={'block-clear'} onClick={this.handleClick}>{title}</a>
    )
  }
}
