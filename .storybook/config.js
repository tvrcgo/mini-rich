import { configure } from '@storybook/react'
import '@storybook/addon-console'

function loadStories() {
  require('./story.js')
}

configure(loadStories, module)
