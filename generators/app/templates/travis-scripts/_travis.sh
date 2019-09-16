#! /bin/bash
set -ev

# Run Sauce if a Pull Request is kicked off
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
  wct --config-file ./wct.conf-remote.json --plugin sauce;
fi

# If I am a push to a branch and that branch is master 
# run sauce tests
# Else I am just a push to a branch
if [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "master" ]; then
  echo 'merge to master, retesting';
  wct --config-file ./wct.conf-remote.json --plugin sauce;
elif [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  echo 'Running headless.';
  xvfb-run -e /dev/stdout -a wct --config-file ./wct.conf-remote.json --plugin local;
fi