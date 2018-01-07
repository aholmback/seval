module.exports = {
  apps : [
  {
    name: 'server',
    script: 'server.js',
    watch: ['./'],
    ignore_watch: ['node_modules', 'ui', 'stash'],
  },
  {
    name: 'ui',
    script: '/usr/bin/npm',
    watch: false,
    cwd: './ui',
    args: 'start',
  },
  {
    name: 'stash',
    script: './manage.py',
    watch: false,
    cwd: './stash',
    args: 'runserver 0.0.0.0:8000',
    interpreter: './env/bin/python',
  },
  {
    name: 'db',
    script: '/usr/bin/docker',
    args: 'start seval-db --attach',
    interpreter: null,
  },
  ]
}
