import React from 'react'

export default function Heading (opts = {}) {

  return {

    renderNode (props, editor, next) {
      const { node, attributes, children } = props
      switch (node.type) {
        case 'h1':
          return <h1 {...attributes}>{children}</h1>
        case 'h2':
          return <h2 {...attributes}>{children}</h2>
        case 'h3':
          return <h3 {...attributes}>{children}</h3>
        case 'h4':
          return <h4 {...attributes}>{children}</h4>
        case 'h5':
          return <h5 {...attributes}>{children}</h5>
        case 'h6':
          return <h6 {...attributes}>{children}</h6>
        default:
          return next()
      }
    },

    onKeyDown(event, editor, next) {
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].some(type => editor.hasBlock(type))) {
        if (event.key === 'Enter') {
          editor.enterBlock()
        }
      } else {
        return next()
      }
    },

    commands: {},

    queries: {},
  }
}

Heading.Rule = {
  serialize(obj, children) {
    const { object, type, data } = obj
    if (object === 'block') {
      switch (type) {
        case 'h1':
          return <h1 className={data.get('className')}>{children}</h1>
        case 'h2':
          return <h2 className={data.get('className')}>{children}</h2>
      }

    }
  },

  deserialize(el, next) {
    const tag = el.tagName.toLowerCase()
    if (['h1', 'h2'].includes(tag)) {
      return {
        object: 'block',
        type: tag,
        data: {
          className: el.getAttribute('class')
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
