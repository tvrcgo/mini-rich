import React from 'react'

export default class Image extends React.Component {

  onReady = (res) => {
    const { editor } = this.props
    const resJson = JSON.parse(res)
    const result = resJson.result
    if (result && result.status === 200) {
      console.log('upload done ->', result)
      editor.insertUploadedResult(result)
      // reset file element
      this.$file.value = ''
    }
  }

  handleChange = () => {
    const { editor } = this.props
    const file = this.$file.files[0]
    if (editor) {
      editor.uploadFile(file, this.onReady)
      editor.showUploading(file)
    }
  }

  handleClick = () => {
    this.$file.click()
  }

  render () {
    const { name, title } = this.props
    return (
      <>
        <a className='mark-image' onClick={this.handleClick} >{title}</a>
        <input ref={ref => this.$file = ref} type='file' id={name || 'images'} accept='image/*' style={{ display: 'none' }} onChange={this.handleChange} />
      </>
    )
  }
}
