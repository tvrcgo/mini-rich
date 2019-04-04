import React from 'react'

export default function Paragraph (opts = {}) {

  return {

    renderNode (props, editor, next) {
      const { node, attributes, children } = props
      if (node.type === 'paragraph') {
        return <div className='block-paragraph' {...attributes}>{children}</div>
      }
      return next()
    },

    normalizeNode(node, editor, next) {
      if (node.object !== 'block') return next()
      const { nodes } = node
    },

    onKeyDown (event, editor, next) {
      if (editor.hasBlock('paragraph')) {
        switch (event.key) {
          case 'Enter':
            return editor.enterBlock()
          default:
            return next()
        }
      }
      return next()
    },

    commands: {

      enterBlock (editor) {
        if (editor.isEnd()) {
          editor.insertAfter()
        } else if (editor.isStart()) {
          editor.insertBefore()
        } else {
          editor.splitBlock()
        }
      },

      insertBefore (editor) {
        editor
          .moveBackward()
          .insertBlock({
            type: 'paragraph'
          })
          .moveForward()
      },

      insertAfter (editor) {
        editor
          .insertBlock({
            type: 'paragraph'
          })
      }
    },
    queries: {
      isEnd(editor) {
        const focusBlock = editor.value.focusBlock
        return editor.value.selection.focus.isAtEndOfNode(focusBlock)
      },

      isStart(editor) {
        const focusBlock = editor.value.focusBlock
        return editor.value.selection.focus.isAtStartOfNode(focusBlock)
      }
    },
  }
}

Paragraph.Rule = {

  serialize (obj, children) {
    const { object, type, data } = obj
    if (object === 'block' && type === 'paragraph') {
      return <p>{children}</p>
    }
  },

  deserialize (elem, next) {
    const tag = elem.tagName.toLowerCase()
    if (['p'].includes(tag)) {
      return {
        object: 'block',
        type: 'paragraph',
        data: {
          className: elem.getAttribute('class')
        },
        nodes: next(elem.childNodes),
      }
    }
  }
}
