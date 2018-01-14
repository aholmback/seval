const path = require('path')
const key = require('./key.json')
const root = __dirname + '/'

module.exports = {
  apps : [
  {
    name: 'server',
    cwd: `${root}${key.server.path}`,
    script: '/usr/bin/npm',
    watch: [`${root}${key.server.path}`],
    args: 'start',
  },
  {
    name: 'ui',
    cwd: `${root}${key.ui.path}`,
    script: '/usr/bin/npm',
    watch: false,
    args: 'run watch',
  },
  {
    name: 'fractal',
    cwd: `${root}${key.ui.path}`,
    script: '/usr/bin/npm',
    watch: false,
    args: 'run fractal',
  },
  {
    name: 'stash_interface',
    script: `${root}${key.stash.path}env/bin/daphne`,
    watch: false,
    args: '-b 0.0.0.0 stash.asgi:channel_layer',
    interpreter: `${root}${key.stash.path}env/bin/python`,
  },
  {
    name: 'stash_workers',
    script: `${root}${key.stash.path}manage.py`,
    watch: [`${root}${key.stash.path}`],
    args: 'runworker',
    interpreter: `${root}${key.stash.path}env/bin/python`,
  },
  {
    name: 'postgres',
    script: '/usr/bin/docker',
    args: `start ${key.stash.postgres.name} --attach`,
    interpreter: null,
  },
  {
    name: 'redis',
    script: '/usr/bin/docker',
    args: `start ${key.stash.redis.name} --attach`,
    interpreter: null,
  },
  ]
}
