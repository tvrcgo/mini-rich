import React from 'react'

export default class Link extends React.Component {

  state = {
    active: false
  }

  componentWillReceiveProps() {
    const { editor, type } = this.props
    if (editor) {
      this.setState({
        active: editor.hasMark(type)
      })
    }
  }

  handleClick = () => {
    const { editor } = this.props
    const url = prompt('Link url', '')
    if (url && editor) {
      editor.addLink(url)
    }
  }

  render() {
    const { title } = this.props
    const { active, visible } = this.state
    return (
      <a className={`mark-link ${active ? 'active' : ''}`} onClick={this.handleClick} >{title}</a>
    )
  }
}
