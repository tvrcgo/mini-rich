import React from 'react'

export default function Italic (opts = {}) {

  const { type = 'italic', key = 'i' } = opts

  return {

    onKeyDown (evt, editor, next) {
      if (!evt.ctrlKey || evt.key != key) return next()
      evt.preventDefault()
      editor.focus().toggleMark(type)
    },

    renderMark (props, editor, next) {
      const { mark, attributes, children } = props
      if (mark.type === type) {
        return <em {...attributes}>{children}</em>
      }
      return next()
    }
  }
}

Italic.Rule = {
  serialize(obj, children) {
    const { object, type, data } = obj
    if (object === 'mark' && type === 'italic') {
      return <i className={data.get('className')} >{children}</i>
    }
  },

  deserialize(el, next) {
    const tag = el.tagName.toLowerCase()
    if (['i'].includes(tag)) {
      return {
        object: 'mark',
        type: 'italic',
        data: {
          className: el.getAttribute('class')
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
