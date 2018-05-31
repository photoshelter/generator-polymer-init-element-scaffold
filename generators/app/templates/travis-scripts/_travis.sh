#! /bin/bash
set -ev

GIT_REPO_BASEDIR=`basename $(git rev-parse --show-toplevel)`
BUILD_NUMBER=${TRAVIS_BUILD_NUMBER:-LOCALHOST}
JOB_NAME="${GIT_REPO_BASEDIR}-${BUILD_NUMBER}"
TUNNEL_IDENTIFIER="${TRAVIS_JOB_NUMBER}"

if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then  
  echo 'Running in Saucelabs';
  wct --plugin sauce \
  --sauce "OSX 10.13/chrome@latest" \
  --sauce "OSX 10.13/firefox@latest" \
  --sauce "OSX 10.13/safari@latest" \
  --sauce "Windows 10/chrome@latest" \
  --sauce "Windows 10/firefox@latest" \
  --sauce "Windows 10/MicrosoftEdge@latest" \
  --sauce "Windows 10/internet explorer@latest" \
  --skip-plugin local \
  --job-name $JOB_NAME \
  --build-number $BUILD_NUMBER \
  --visibility team;
fi

# If this is not a Pull Request we will run our tests on 
# We don't always want to run against saucelabs when we do a push
# This allows us to test headlessly against Chrome and firefox.
# 
if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  echo 'Running headless.';
  xvfb-run -e /dev/stdout -a wct;
fi