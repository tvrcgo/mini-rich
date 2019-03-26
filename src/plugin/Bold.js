import React from 'react'

export default function Bold (opts = {}) {

  const { type = 'bold', key = 'b' } = opts

  return {

    onKeyDown (evt, editor, next) {
      if (!evt.ctrlKey || evt.key != key) return next()
      evt.preventDefault()
      editor.focus().toggleMark(type)
    },

    renderMark (props, editor, next) {
      const { mark, attributes, children } = props
      if (mark.type === type) {
        return <strong {...attributes}>{children}</strong>
      }
      return next()
    },

    queries: {}
  }
}

Bold.Rule = {

  serialize (obj, children) {
    const { object, type, data } = obj
    if (object === 'mark' && type === 'bold') {
      return <strong className={data.get('className')} >{children}</strong>
    }
  },

  deserialize (el, next) {
    const tag = el.tagName.toLowerCase()
    if (['strong', 'b'].includes(tag)) {
      return {
        object: 'mark',
        type: 'bold',
        data: {
          className: el.getAttribute('class')
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
