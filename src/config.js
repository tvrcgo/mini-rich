import Loader from './lib/loader'
// plugins
import Editor from './plugin/Editor'
import Link from './plugin/Link'
import Bold from './plugin/Bold'
import Italic from './plugin/Italic'
import Underlined from './plugin/Underlined'
import Paragraph from './plugin/Paragraph'
import Heading from './plugin/Heading'
import Quote from './plugin/Quote'
import Image from './plugin/Image'
import Video from './plugin/Video'

const { plugins, serializer } = Loader(
  Editor,
  Link,
  Bold,
  Italic,
  Underlined,
  Paragraph,
  Heading,
  Quote,
  Image,
  Video,
)

const schema = {
  document: {

  },
  blocks: {
    image: {
      isVoid: true
    },
    video: {
      isVoid: true
    }
  }
}

export {
  plugins,
  serializer,
  schema
}
