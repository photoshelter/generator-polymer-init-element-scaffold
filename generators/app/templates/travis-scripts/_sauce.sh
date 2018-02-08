
#! /bin/bash

GIT_REPO_BASEDIR=`basename $(git rev-parse --show-toplevel)`
BUILD_NUMBER=${TRAVIS_BUILD_NUMBER:-LOCALHOST}
JOB_NAME="${GIT_REPO_BASEDIR}-${BUILD_NUMBER}"
TUNNEL_IDENTIFIER="${TRAVIS_JOB_NUMBER}"

echo "begin testing on saucelabs"
echo "GIT REPO BASEDIR: ${GIT_REPO_BASEDIR}"
echo "BUILD_NUMBER: ${BUILD_NUMBER}"
echo "JOB_NAME: ${JOB_NAME}"
echo "TUNNEL_IDENTIFIER: ${TUNNEL_IDENTIFIER}"

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
  --visibility team

  echo "tests complete"