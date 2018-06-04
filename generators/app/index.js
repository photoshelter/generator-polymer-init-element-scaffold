'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.appname = this._dashedCaseFromSpaces(this.appname);
  },

  prompting: function () {

    this.log(yosay(
      'Welcome to the solid ' + chalk.red('generator-polymer-init-element-scaffold') + ' generator!'
    ));

    var prompts = [
    { /* ELEMENT: Name */
      type: 'input',
      name: 'elementName',
      message: 'What is the name of the new element?',
      validate: (input) => (input.indexOf('-') === -1 ? 'Element name needs a \'-\'' : true),
      default: this.appname
    },

    { /* ELEMENT Version: 1.x || 2.0 || Vanilla */
      type: 'list',
      name: 'elementVersion',
      message: 'What version of element are you building?',
      choices: ['1.x', '2.0','vanilla'],
      default: '1.x'
    },

    { /* ELEMENT Type: component || style || behavior */
      type: 'list',
      name: 'elementType',
      message: 'What type of element are you building?',
      choices: this._elementOptions,
      default: 'component'
    },

    { /* BEHAVIOR: Name */
      when: (props) => (props.elementType === 'behavior' && props.elementVersion ===  '1.x'),
      type: 'input',
      name: 'behaviorNameSpace',
      message: 'What namespace would you like for your behavior?',
      default: 'fooBehavior',
      store: true
    },

    { /* BEHAVIOR: Extended */
      when: (props) => (props.elementType === 'behavior' && props.elementVersion ===  '1.x'),
      type: 'confirm',
      name: 'isBehaviorExtend',
      message: 'Is this a behavior extension?',
      default: false
    },
    { /* IMPLEMENTATION: Bower || Internal */

      type: 'list',
      name: 'elementImplementation',
      message: 'Is this a bower element or internal element?',
      choices: ['bower', 'internal'],
      default: 'bower'
    },

    { /* NEW DIRECTORY: Yes || No */
      type: 'confirm',
      name: 'createDirectory',
      message: 'Should I create a directory for you?',
      // defaults to true for internal elements.
      default: (props) => (props.elementImplementation === 'internal')
    },

    { /* ELEMENT: Description */
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'elementDescription',
      message: 'What does this element do?',
      default: 'nothing yet'
    },

    { /* AUTHOR */
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'authorName',
      message: 'What is your name?',
      default: 'author',
      store: true
    },

    { /* REPO */
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'list',
      name: 'gitAccount',
      message: 'Is this an enterprise (privately hosted account) or personal?',
      choices: ['enterprise', 'personal'],
      default: 'enterprise',
      store   : true
    },
    {
      when: (props) => (props.elementImplementation === 'bower' && props.gitAccount ===  'enterprise'),
      type: 'input',
      name: 'gitRoot',
      message: 'Where is the root domain name?',
      default: 'gh.enterprise.server',
      store   : true
    },
    {
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'orgName',
      message: 'What is your organiztion or account name ',
      default: 'org',
      store: true
    },

    { /* GROUP */
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'elementGrouping',
      message: 'What group does your element belong to?',
      default: 'none',
      store: true
    },

    // // TODO: implement regex for tests inclusion
    // { /* TESTS */
    //   when: (props) => (props.elementImplementation === 'bower'),
    //   type: 'confirm',
    //   name: 'testable',
    //   message: 'Would you like to include tests ?',
    //   default: true
    // },

    { /* SAUCE LABS */
      when: (props) => (props.elementImplementation === 'bower'/*&& props.testable*/),
      type: 'confirm',
      name: 'sauceLabs',
      message: 'Would you like to use sauce labs for cross browser testing ?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      this.props.className = this._cappedCaseFromDashed(props.elementName);

      // need to have values
      this._setDefaultValues();

    }.bind(this));
  },

  _cappedCaseFromDashed: function(element) {
    if(typeof element !== "undefined") {
      return element.split('-').map( (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }).join('');
    }
    return element
  },

  _dashedCaseFromSpaces: function(name) {
    if(typeof name !== "undefined") {
      return name.replace(/\s/g,'-');
    }
  },

  _elementOptions: function(props) {
    if(props.elementVersion === '1.x') {
      return ['component','style', 'behavior']
    } else if(props.elementVersion === '2.0') {
      return ['component','behavior']
    } else {
      return ['component']
    }
  },

  _setDefaultValues: function() {
    // Sort of annoying but nothing can be undefined, even if it isn't "used"
    this.props.authorName = this.props.authorName || 'internal';
    this.props.orgName = this.props.orgName || 'internal';
    this.props.elementDescription = this.props.elementDescription || 'internal';
    this.props.elementGrouping = this.props.elementGrouping || 'internal';
    this.props.testable = this.props.testable || false;
    this.props.sauceLabs = this.props.sauceLabs || false;
    this.props.sauceName = this.props.sauceName || 'saucey-user';
    this.props.gitRoot = this.props.gitRoot || 'github';
    this.props.gitAccount = this.props.gitAccount || 'internal'
  },

  writing: function () {
    // Grab the vars you need and write the files
    const elementVersion = this.props.elementVersion;
    const elementType = this.props.elementType;
    const elementName = this.props.elementName;

    if (this.props.createDirectory) {
      this._updateRoot(elementName);
    }

    this._sharedWrites(elementName);
    this._versionWrite(elementVersion, elementType, elementName);
  },

   _updateRoot:function(elementName) {
    this.destinationRoot(elementName);
  },

  _sharedWrites: function(elementName) {
    // Global: Copy over all files.
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    // USER SELECTS: 'bower'
    if (this.props.elementImplementation === 'bower') {

      // Bower: Copy over dot files.
      this.fs.copyTpl(
       `${this.templatePath()}/.!(gitignore)*`,
        this.destinationRoot(),
        this.props
      );

      // NPM: get over npm publish quirk with file rename.
      this.fs.copyTpl(
        this.templatePath('.gitignorefile'),
        this.destinationPath(`.gitignore`),
        this.props
      );

      if (this.props.sauceLabs) {
        this.fs.copyTpl(
          this.templatePath('travis-scripts/_travis.sh'),
          this.destinationPath(`travis-scripts/travis.sh`),
          this.props
        );
      }
    }
  },

  _versionWrite: function(version, elementType, elementName) {

    // Copy the main html file.
    this.fs.copyTpl(
      this.templatePath(`src/${version}/${elementType}/_${elementType}.html`),
      this.destinationPath(`${elementName}.html`),
      this.props
    );

    // If it is a style type you need to copy over the file
    if(elementType === 'style') {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    }

    // USER SELECTED: Version 1.x
    if (version === '1.x') {
      this._PolymerOneWrite(version, elementType, elementName);
    }

    // USER SELECTED: Version 2.0
    else if (version === '2.0') {
      this._PolymerTwoWrite(version,elementType, elementName);
    }

    // USER SELECTED: Vanilla
    else if (version === 'vanilla') {
      this._VanillaWrite(version, elementType, elementName);
    }
  },

  _PolymerOneWrite: function(version,elementType, elementName) {

    if(elementType === 'component') {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.js`),
        this.destinationPath(`${elementName}.js`),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-styles.html`),
        this.destinationPath(`${elementName}-styles.html`),
        this.props
      );
    }

    if(elementType === 'style') {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    }

    if(elementType === 'behavior') {
      this.fs.copyTpl(
        this.templatePath(`demo/_${elementType}-demo.html`),
        this.destinationPath(`demo/${elementName}-demo.html`),
        this.props
      );
    }
  },

  _PolymerTwoWrite: function(version, elementType, elementName) {

    if(elementType === 'component' || elementType === 'behavior') {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.js`),
        this.destinationPath(`${elementName}.js`),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-styles.html`),
        this.destinationPath(`${elementName}-styles.html`),
        this.props
      );

      // Publish the doc file for
      this.fs.copyTpl(
        this.templatePath('_docs2.0.html'),
        this.destinationPath(`docs.html`),
        this.props
      );
    }

    if(elementType === 'behavior') {
      this.fs.copyTpl(
        this.templatePath(`demo/_${elementType}-demo.html`),
        this.destinationPath(`demo/${elementName}-demo.html`),
        this.props
      );
    }

  },

  _VanillaWrite: function(version, elementType, elementName) {
    if(elementType === 'component') {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.js`),
        this.destinationPath(`${elementName}.js`),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-styles.css`),
        this.destinationPath(`${elementName}-styles.css`),
        this.props
      );
    }
  },

  install: function () {
    // How to handle the deps
    this.installDependencies({
      bower: this.props.elementImplementation === 'bower',
      npm: true
    });
  }

});
