import React from 'react'
import Mark from './Mark'
import Block from './Block'
import Link from './Link'
import Image from './Image'
import Video from './Video'
import Clear from './Clear'

const Provider = (props) => {
  const { children } = props
  if (children instanceof Array) {
    return React.Children.map(children, child => {
      return React.cloneElement(child, props)
    })
  } else {
    return React.cloneElement(children, props)
  }
}

export default class Toolbar extends React.Component {

  render () {
    return (
      <div className='toolbar'>
        <Provider {...this.props}>
          <Block type='h1' title='H1' />
          <Block type='h2' title='H2' />
          <Mark type='bold' title={<i className="material-icons">format_bold</i>} />
          <Mark type='italic' title={<i className="material-icons">format_italic</i>} />
          <Mark type='underlined' title={<i className="material-icons">format_underlined</i>} />
          <Block type='quote' title={<i className="material-icons">format_quote</i>} />
          <Link title={<i className="material-icons">insert_link</i>} />
          <Image title={<i className="material-icons">insert_photo</i>} />
          <Video title={<i className="material-icons">videocam</i>} />
          <Clear title={<i className="material-icons">format_clear</i>} />
        </Provider>
      </div>
    )
  }
}
