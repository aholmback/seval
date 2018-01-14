const key = require('./key.json')

module.exports = {
  apps : [
  {
    name: 'server',
    cwd: './server',
    script: '/usr/bin/npm',
    watch: ['server'],
    args: 'start',
  },
  {
    name: 'ui',
    cwd: './ui',
    script: '/usr/bin/npm',
    watch: false,
    args: 'run watch',
  },
  {
    name: 'fractal',
    cwd: './ui',
    script: '/usr/bin/npm',
    watch: false,
    args: 'run fractal',
  },
  {
    name: 'stash_interface',
    cwd: './stash',
    script: './env/bin/daphne',
    watch: false,
    args: '-b 0.0.0.0 stash.asgi:channel_layer',
    interpreter: './env/bin/python',
  },
  {
    name: 'stash_workers',
    cwd: './stash',
    script: './manage.py',
    watch: false,
    args: 'runworker',
    interpreter: './env/bin/python',
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
