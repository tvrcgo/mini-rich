import React from 'react'

export default function Video (opts = {}) {

  return {
    renderNode(props, editor, next) {
      const { node, attributes, children, isFocused } = props
      if (node.type === 'video') {
        const src = node.data.get('src')
        const className = node.data.get('className') || ''
        return <video {...attributes} src={src} className={`${className} block-video ${isFocused ? 'focused' : ''}`}/>
      }
      return next()
    },
    commands: {
      insertVideo (editor, url) {
        editor
          .insertBlock({
            type: 'video',
            data: {
              src: url
            }
          })
          .wrapBlock('paragraph')
      }
    },
    queries: {},
  }
}

Video.Rule = {

  serialize(obj, children) {
    const { object, type, data } = obj
    if (object === 'block' && type === 'video') {
      return <video src={data.get('src')} />
    }
  },

  deserialize(el, next) {
    const tag = el.tagName.toLowerCase()
    if (['video'].includes(tag)) {
      return {
        object: 'block',
        type: 'video',
        data: {
          'src': el.getAttribute('src'),
          'className': el.getAttribute('class'),
          'res-id': el.getAttribute('res-id')
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
