### DEVELOPMENT

During development there are 3 pages you might be interested in.
 - The root page is there to display the documentation.
 - The `/demo` page is there to display various demos for how to use your component.
 - The `/implementation` page, is a sandbox where you can work with less noise compared to the demo page.

**Running Your Project**

 - `npm start` is the default command to spin your project. It will clean up any old builds
 and then start up a development server on port `3000`  using [Browsersync](https://www.browsersync.io/) to reload the page when changes occur.

**note:** If you are finding that when reloading it is switching from demos back to docs, then in the browser add the route `/demo` to the url and then the refreshes will happen on that route.

<% if (elementVersion === '2.x') { -%>
 **note:** Make sure you are using [Chrome Canary](https://www.google.com/chrome/browser/canary.html) for development
<% } -%>
### Demos and Releases

All components should follow semver versioning.

- You can run one of three commands to bump and tag your new release.
  - `npm run release-patch` updates from 0.0.1 to 0.0.2
  - `npm run release-minor` updates from 0.0.1 to 0.1.0
  - `npm run release-major` updates from 0.0.1 to 1.0.0

- All projects also come with built in demos and docs.
  - `npm run pages` is the command to deploy a [Github Pages](https://pages.github.com/) site for your project
<% if (gitAccount === 'personal') { -%>
    - [<%=elementName%>](https://<%=orgName%>.github.io/<%=elementName%>)
<% } else { -%>
    - [<%=elementName%>](https://<%=gitRoot%>.com/pages/<%=orgName%>/<%=elementName%>)
<% } -%>
  - **note:**
    - This creates a orphan branch with no history.
    - Always run this from `master` after pulling the latest build to ensure your docs reflect the most recent version.

### Linting
- You need to install the [eslint-cli](https://www.npmjs.com/package/eslint-cli) globally before linting will work. 
- the configuration is in the `.eslintrc.json` file. 
- You can manually run `eslint filename` in your terminal to lint any file you want.
- but there are also some predefined commands. 
- there are 2 linting commands
  - first a `no-block-es-lint` command that forces a clean exit despite there being linting errors, it is not the best plan, but it was solution found [here](https://github.com/eslint/eslint/issues/2409#issuecomment-103768546).
  - second a `full-lint` command that runs the `no-block-es-lint` command and polymer lint in sequence. This is the command you should be running regularly. 

### Testing
- `npm run test` is the command to run basic tests using [Web Component Tester](https://github.com/Polymer/web-component-tester) in the terminal.

Automated testing is also supported with [TravisCI](https://travis-ci.org/getting_started). If you enable this feature on the Github repo then tests are set to run on every commit. This can be adjusted in the `.travis.yml`

<% if (sauceLabs === true) { -%>
We also support greater cross browser support with testing from [SauceLabs](https://saucelabs.com/). These are currently built to run on every pull request.

- `npm run sauce` to run tests in saucelabs. Contact the QA team for credentials if you would like to run them there.

To add more VMs to `travis-scripts/sauce.sh` if you would like to increase your cross browser coverage.

###### SauceLabs Setup

If you have Saucelabs Credentials there are several ways to add them to travis:
You will need to install the [travis-cli tool](https://github.com/travis-ci/travis.rb) before running the following commands.

[Defining Encrypted Variables in .travis.yml](https://docs.travis-ci.com/user/environment-variables/#Defining-encrypted-variables-in-.travis.yml)

```bash
$ travis encrypt SAUCE_USERNAME=[your-user-name] --add
$ travis encrypt SAUCE_ACCESS_KEY=[your-access-key] --add
```

[Defining Variables in Repository Settings](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings)

```bash
$ travis env set SAUCE_USERNAME your-user-name
$ travis env set SAUCE_ACCESS_KEY your-access-key
```
<% } -%>

<% if (artifactory === true) { -%>
###### Artifactory Support

If you use Artifactory for dependency management you will need to add environment variables.  To do this run the following travis.  You will need to install the [travis-cli tool](https://github.com/travis-ci/travis.rb) before running the following commands.

[Defining Variables in Repository Settings](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings)

Setting your NPM Token
```bash
    travis env set ARTIFACTORY_NPM_TOKEN "$YOUR_ARTIFACTORY_NPM_TOKEN"
```

Setting your Artifactory NPM & Bower Registry URL's.  The URL will be your artifactory URL.
http://your.artifactory/artifactory/api/npm/npm/ for NPM registry
http://your.artifactory/artifactory/api/bower/bower for your Bower registry

```bash
    travis env set ARTIFACTORY_BOWER_REGISTRY "$YOUR_BOWER_REGISTRY_URL"
    travis env set ARTIFACTORY_NPM_REGISTRY "$YOUR_NPM_REGISTRY_URL"
```

<% } -%>

<% if (slack === true) { -%>
###### Slack Support

If you use Slack for notification and would like [travis to send status notifications](https://docs.travis-ci.com/user/notifications/#configuring-slack-notifications) to a channel edit the travis.yml file and enter your organization and slack key.

```
slack: your-organization:your-key
```
<% } -%>