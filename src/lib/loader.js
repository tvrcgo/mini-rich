import Html from 'slate-html-serializer'

export default (...Plugins) => {
  const plugins = []
  const rules = []
  Plugins.forEach(P => {
    if (typeof P === 'function') {
      plugins.push(P())
    }
    if (P.Rule && P.Rule.serialize && P.Rule.deserialize) {
      rules.push(P.Rule)
    }
  })
  return {
    plugins,
    serializer: new Html({ rules })
  }
}
