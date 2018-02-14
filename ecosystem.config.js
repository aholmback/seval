const path = require('path')
const key = require('./key.json')
const root = __dirname + '/'

const common = {
  error_file: `${root}seval.log`,
  out_file: `${root}seval.log`,
  merge_logs: true,
  log_date_format: '☺ HH:mm:ss ☺',
  watch: false,
}

const apps = [
  {
    name: 'server',
    cwd: `${root}${key.server.path}`,
    script: '/usr/bin/npm',
    watch: [`${root}${key.server.path}`],
    ignore_watch: [`${root}${key.server.path}node_modules`],
    args: 'start',
    error_file: `${root}logs/server.log`,
    out_file: `${root}logs/server.log`,
  },
  {
    name: 'ui',
    cwd: `${root}${key.ui.path}`,
    script: '/usr/bin/npm',
    args: 'run watch',
    error_file: `${root}logs/ui.log`,
    out_file: `${root}logs/ui.log`,
  },
  {
    name: 'fractal',
    cwd: `${root}${key.ui.path}`,
    script: '/usr/bin/npm',
    args: 'run fractal',
    error_file: `${root}logs/fractal.log`,
    out_file: `${root}logs/fractal.log`,
  },
  {
    name: 'stash_interface',
    cwd: `${root}${key.stash.path}`,
    script: `${root}${key.stash.path}env/bin/daphne`,
    watch: [`${root}${key.stash.path}`],
    args: '-b 0.0.0.0 stash.asgi:application',
    interpreter: `${root}${key.stash.path}env/bin/python`,
    error_file: `${root}logs/stash_interface.log`,
    out_file: `${root}logs/stash_interface.log`,
  },
  {
    name: 'stash_workers',
    script: `${root}${key.stash.path}manage.py`,
    args: 'runworker default',
    interpreter: `${root}${key.stash.path}env/bin/python`,
    error_file: `${root}logs/stash_workers.log`,
    out_file: `${root}logs/stash_workers.log`,
  },
  {
    name: 'postgres',
    script: '/usr/bin/docker',
    args: `start ${key.stash.postgres.name} --attach`,
    interpreter: null,
    error_file: `${root}logs/postgres.log`,
    out_file: `${root}logs/postgres.log`,
  },
  {
    name: 'redis',
    script: '/usr/bin/docker',
    args: `start ${key.stash.redis.name} --attach`,
    interpreter: null,
    error_file: `${root}logs/redis.log`,
    out_file: `${root}logs/redis.log`,
  },
]

for(var i=0; i < apps.length; i++) {
  for(var k in common) {
    apps[i][k] = apps[i][k] || common[k]
  }
}

module.exports = apps
