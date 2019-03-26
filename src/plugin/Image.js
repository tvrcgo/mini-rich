import React from 'react'
import { getEventTransfer, getEventRange } from 'slate-react'

const map2obj = (map) => {
  const obj = {}
  Array.from(map.entries()).forEach(v => {
    obj[v[0]] = v[1]
  })
  return obj
}

export default function Image (opts = {}) {

  return {

    renderNode (props, editor, next) {
      const { node, attributes, children, isFocused } = props
      if (node.type === 'image') {
        const className = node.data.get('className') || ''
        return <img {...attributes} {...map2obj(node.data)} className={`${className} block-image ${isFocused ? 'focused' : ''}`} />
      }
      return next()
    },

    onKeyDown (event, editor, next) {
      // 在图片一行回车
      if (editor.hasBlock('image')) {
        if (event.key === 'Enter') {
          console.log('image enter')
          editor.insertBlock('paragraph')
        }
      } else {
        return next()
      }
    },

    onDrop (event, editor, next) {

    },

    onPaste (event, editor, next) {
      const transfer = getEventTransfer(event)
      const { type } = transfer
      // dnd
      if (type === 'files') {
        const target = getEventRange(event, editor)
        if (!target && event.type === 'drop') return next()
        const { files } = transfer
        return
      }
      return next()
    },

    commands: {

      uploadFile (editor, { url, file, onOk }) {
        const xhr = new XMLHttpRequest()
        const fd = new FormData()
        fd.append('file', file)

        xhr.open('POST', url, true)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            onOk && onOk(xhr.responseText)
          }
        }
        xhr.send(fd)
      },

      showUploading (editor, file) {
        editor
          .insertBlock({
            key: 'uploading',
            type: 'paragraph',
          })
          .insertText(`[Uploading ${file.name} ... ]`)
      },

      insertUploadedResult (editor, result) {
        editor
          .removeNodeByKey('uploading')
          .insertBlock({
            type: 'image',
            data: {
              src: result.url
            }
          })
          .wrapBlock('paragraph')
      }
    },
    queries: {},
  }
}

Image.Rule = {

  serialize(obj, children) {
    const { object, type, data } = obj
    if (object === 'block' && type === 'image') {
      return <img {...map2obj(data)} />
    }
  },

  deserialize(elem, next) {
    const tag = elem.tagName.toLowerCase()
    if (['img'].includes(tag)) {
      return {
        object: 'block',
        type: 'image',
        data: {
          'src': elem.getAttribute('src'),
          'className': elem.getAttribute('class'),
          'res-id': elem.getAttribute('res-id'),
        },
        nodes: next(elem.childNodes),
      }
    }
  }
}
