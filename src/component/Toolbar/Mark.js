import React from 'react'

export default class Mark extends React.Component {

  state = {
    active: false
  }

  componentWillReceiveProps () {
    const { editor, type } = this.props
    if (editor) {
      this.setState({
        active: editor.hasMark(type)
      })
    }
  }

  toggleMark = () => {
    const { editor, type } = this.props
    const { active } = this.state
    if (active) {
      editor.focus().clearMarks(type)
    } else {
      editor.focus().addMark(type)
    }
  }

  render () {
    const { type, title } = this.props
    const { active } = this.state
    return (
      <a className={`mark-${type} ${active ? 'active' : ''}`} onClick={this.toggleMark} >{title}</a>
    )
  }
}
