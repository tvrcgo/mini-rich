import React from 'react'

export default function Anchor (opts = {}) {

  const { type = 'link' } = opts

  return {
    renderMark (props, editor, next) {
      const { mark, attributes, children } = props
      if (mark.type === type) {
        return <a {...attributes} className='mark-link'>{children}</a>
      }
      return next()
    },

    commands: {
      addLink (editor, url) {
        editor.addMark({
          type: 'link',
          object: 'mark',
          data: {
            href: url
          }
        })
      },

      pasteLink (editor, url) {
        if (url) {
          editor.insertText(url).addMark({
            type: 'link',
            object: 'mark',
            data: {
              href: url
            }
          })
        }
      }
    }
  }
}

Anchor.Rule = {
  serialize (obj, children) {
    const { object, type, data } = obj
    if (object === 'mark' && type === 'link') {
      const href = data.get('href')
      return <a href={href} target='_blank'>{children}</a>
    }
  },

  deserialize (el, next) {
    const tag = el.tagName.toLowerCase()
    if (['a'].includes(tag)) {
      return {
        object: 'mark',
        type: 'link',
        data: {
          href: el.getAttribute('href'),
          target: el.getAttribute('target'),
        },
        nodes: next(el.childNodes),
      }
    }
  }
}
