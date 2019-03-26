import React from 'react'


export default class Heading extends React.Component {

  state = {
    active: false
  }

  componentWillReceiveProps () {
    const { editor, type } = this.props
    if (editor) {
      this.setState({
        active: editor.hasBlock(type)
      })
    }
  }

  toggleBlock = () => {
    const { editor, type } = this.props
    const { active } = this.state
    editor.focus().setBlocks(active ? 'paragraph' : type)
  }

  render () {
    const { type, title } = this.props
    const { active } = this.state
    return (
      <a className={`block-${type} ${active ? 'active' : ''}`} onClick={this.toggleBlock}>{title}</a>
    )
  }
}
