import React from 'react'

export default function Quote (opts = {}) {

  return {
    renderNode (props, editor, next) {
      const { node, attributes, children } = props
      if (node.type === 'quote') {
        return <blockquote {...attributes}>{children}</blockquote>
      }
      return next()
    },

    onKeyDown(event, editor, next) {
      if (editor.hasBlock('quote')) {
        if (event.key === 'Enter') {
          editor.splitBlock()
        }
      } else {
        return next()
      }
    },
  }
}

Quote.Rule = {

  serialize(obj, children) {
    const { object, type, data } = obj
    if (object === 'block' && type === 'quote') {
      return <blockquote className={data.get('className')} >{children}</blockquote>
    }
  },

  deserialize(el, next) {
    const tag = el.tagName.toLowerCase()
    if (['quote'].includes(tag)) {
      return {
        object: 'block',
        type: 'quote',
        data: {
          className: el.getAttribute('class')
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
