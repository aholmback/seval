I create an archive from current branch in your local git repo and put it on your hosts.

The archive would contain just what a checkout would contain, but without /.git/.

Provide me with:
* path to local repo (or {{ ansible\_script }} will be assumed)
* place for archive to temporarily reside (or /tmp will be assumed)
* target directory on hosts
