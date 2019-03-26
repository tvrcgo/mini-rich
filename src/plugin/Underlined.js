import React from 'react'

export default function Underlined (opts = {}) {

  const { type = 'underlined', key = 'u' } = opts

  return {

    onKeyDown(evt, editor, next) {
      if (!evt.ctrlKey || evt.key != key) return next()
      evt.preventDefault()
      editor.focus().toggleMark(type)
    },

    renderMark(props, editor, next) {
      const { mark, attributes, children } = props
      if (mark.type === type) {
        return <u {...attributes}>{children}</u>
      }
      return next()
    }
  }
}

Underlined.Rule = {
  serialize(obj, children) {
    const { object, type, data } = obj
    if (object === 'mark' && type === 'underlined') {
      return <u className={data.get('className')} >{children}</u>
    }
  },

  deserialize(el, next) {
    const tag = el.tagName.toLowerCase()
    if (['u'].includes(tag)) {
      return {
        object: 'mark',
        type: 'underlined',
        data: {
          className: el.getAttribute('class')
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
