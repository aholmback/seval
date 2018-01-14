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

const handlebars = require('@frctl/handlebars')({
  helpers: {
    path: function (src) {
      console.log(src)
      return src
    }
  }
})

fractal.set('project.title', package.name)

fractal.components.set('path', path.resolve(root, key.components.path))

/* fractal defaults to ".handlebars" */
fractal.components.set('ext', '.hbs')

/* Don't watch files in components that isn't templates or config files, bundler will deal with those if necessary. */
fractal.web.set('server.syncOptions', {
  watchOptions: {
    ignored: [
      path.resolve(root, key.components.path, '**/!(*.hbs|*.config.js)')
    ]
  }
})

/* Distribution files will be under url /dist/ */
fractal.web.set('static.path', path.resolve(root, key.public.root))
