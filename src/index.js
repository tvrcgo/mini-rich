import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import { plugins, schema, serializer } from './config'
import './index.less'
import Toolbar from './component/Toolbar'

export default class ContentEditor extends React.Component {

  state = {
    value: serializer.deserialize(this.props.value),
    text: this.props.value
  }

  onChange = ({ value }) => {
    // should update
    if (value.document !== this.state.value.document) {
      const text = serializer.serialize(value)
      this.setState({ text })
      const { onChange } = this.props
      onChange && onChange(text)
    }
    this.setState({ value })
  }

  render () {
    return (
      <div className='contenteditor'>
        <Toolbar
          {...this.props}
          editor={this.$editor}
        />
        <Editor
          className='content'
          ref={ref => this.$editor = ref}
          value={this.state.value}
          plugins={plugins}
          schema={schema}
          onChange={this.onChange}
        />
      </div>
    )
  }
}
