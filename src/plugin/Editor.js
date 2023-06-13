import React from 'react'
import { getEventTransfer, getEventRange } from 'slate-react'

export default function Editor (opts = {}) {

  return {

    onKeyDown (event, editor, next) {
      console.log('Key =', event.key)
      if ((event.metaKey || event.ctrlKey) && event.key === 'a') {
        const native = window.getSelection()
        console.log('native', native)
        const range = native.getRangeAt(0)
        console.log('range', range)
        const contents = range.cloneContents()
        console.log('select some', editor.value.fragment.text)
      }
      switch (event.key) {
        case 'Backspace':
          console.log(editor.value.selection)
          return editor.deleteBackward()
        case 'Delete':
          return editor.deleteForward()
        default:
          return next()
      }
    },

    onPaste (event, editor, next) {
      const transfer = getEventTransfer(event)
      const { type } = transfer

      console.log('onPaste >', transfer)

      // paste fragment
      if (type === 'fragment') {
        editor.insertFragment(transfer.fragment)
        return
      }

      return next()
    },

    commands: {
      // remove marks in selection
      clearMarks (editor, type) {
        editor.value.marks
          .filter(mark => type ? mark.type === type : true)
          .map(mark => editor.removeMark(mark))
        editor.focus()
      },

      // remove focus block
      removeBlock (editor) {
        editor.value.blocks
          .map(block => editor.removeNodeByKey(block.key))
      },

      // remove selection
      removeSelection (editor) {

      }
    },

    queries: {
      hasMark (editor, type) {
        return editor.value.marks.some(mark => mark.type === type)
      },

      hasBlock (editor, type) {
        return editor.value.blocks.some(block => block.type === type)
      }
    }
  }
}
