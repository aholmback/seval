/**
 * Mostly default stuff, read more here:
 * https://fractal.build/guide/project-settings
 * https://fractal.build/guide/core-concepts/configuration-files
 */
const path = require('path')
const fractal = module.exports = require('@frctl/fractal').create()

const package = require('./package.json')

const key = require('../key.json')
const root = path.resolve(__dirname, '..')

fractal.set('project.title', package.name)

fractal.components.set('path', path.resolve(root, key.components.path))

fractal.components.set('ext', '.hbs')

fractal.web.set('static.path', path.resolve(root, key.public.root))

/* Don't watch files in components that isn't templates or config files, bundler will deal with those if necessary. */
fractal.web.set('server.syncOptions', {
  watchOptions: {
    ignored: [
      path.resolve(root, key.components.path, '**/!(*.hbs|*.config.js)')
    ]
  }
})

