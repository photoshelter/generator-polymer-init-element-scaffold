'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.appname = this._dashedCaseFromSpaces(this.appname);
  },

  // Have Yeoman greet the user.
  prompting: function () {

    this.log(yosay(
      'Welcome to the solid ' + chalk.red('generator-polymer-init-element-scaffold') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'elementName',
      message: 'What is the name of the new element?',
      validate: (input) => (input.indexOf('-') === -1 ? 'Element name needs a \'-\'' : true),
      default :this.appname
    },

    {
      type: 'list',
      name: 'polyVers',
      message: 'What kind of element are you building?',
      choices: ['1.x', '2.0','behavior','vanilla', 'style'],
      default: '1.x'
    },
    {
      type: 'list',
      name: 'elementType',
      message: 'Is this a bower element or implementation?',
      choices: ['bower', 'implementation'],
      default: 'bower'
    },
    {
      when: (props) => (props.elementType === 'bower'),
      type: 'input',
      name: 'elementDescription',
      message: 'What does this element do?',
      default: 'nothing yet'
    },
    {
      when: (props) => (props.elementType === 'bower'),
      type: 'input',
      name: 'authorName',
      message: 'What is your name?',
      default: 'author',
      store   : true
    },
    {
      when: (props) => (props.elementType === 'bower'),
      type: 'input',
      name: 'gitDomain',
      message: 'Where does your repo reside?',
      default: 'github',
      store   : true
    },
    {
      when: (props) => (props.elementType === 'bower'),
      type: 'input',
      name: 'orgName',
      message: 'What is your organiztion\'s repo?',
      default: 'org',
      store   : true
    },
    {
      when: (props) => (props.elementType === 'bower'),
      type: 'input',
      name: 'elementGrouping',
      message: 'What group does your element belong to?',
      default: 'none',
      store   : true
    },
    // // TODO: implement regex for tests inclusion
    // {
    //   when: (props) => (props.elementType === 'bower'),
    //   type: 'confirm',
    //   name: 'testable',
    //   message: 'Would you like to include tests ?',
    //   default: true
    // },
    {
      when: (props) => (props.elementType === 'bower'/*&& props.testable*/),
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
    if( typeof element !== "undefined") {
      return element.split('-').map( (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }).join('');
    }
    return element
  },

  _dashedCaseFromSpaces: function(name) {

    if( typeof name !== "undefined") {
      return name.replace(/\s/g,'-');
    }
  },

  _setDefaultValues: function() {

    this.props.authorName = this.props.authorName || 'implementation';
    this.props.orgName = this.props.orgName || 'implementation';
    this.props.elementDescription = this.props.elementDescription || 'implementation';
    this.props.elementGrouping = this.props.elementGrouping || 'implementation';
    this.props.testable = this.props.testable || false;
    this.props.sauceLabs = this.props.sauceLabs || false;
    this.props.gitDomain = this.props.gitDomain || 'github';

  },

  writing: function () {

    const polyVers = this.props.polyVers;
    const elementName = this.props.elementName;

    this._sharedWrites();
    this._versionWrite(polyVers, elementName);
  },

  _sharedWrites: function() {

    // copy all general files.
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    // copy over dot files for bower.
    if (this.props.elementType === 'bower') {
      this.fs.copyTpl(
       `${this.templatePath()}/.!(gitignore)*`,
        this.destinationRoot(),
        this.props
      );

      // get over npm publish quirk with file rename.
      this.fs.copyTpl(
        this.templatePath('.gitignorefile'),
        this.destinationPath('.gitignore'),
        this.props
      );

    }
  },


  _versionWrite:function(version, elementName) {

    // Copy the main html file.
    this.fs.copyTpl(
      this.templatePath(`src/${version}/_element.html`),
      this.destinationPath(`${elementName}.html`),
      this.props
    );

    
    if(version != 'style') {
      // copy the js for all the components. 
      this.fs.copyTpl(
        this.templatePath(`src/${version}/_element.js`),
        this.destinationPath(`${elementName}.js`),
        this.props
      );

      // copy the styles. css for vanilla and html for polymer
      const fileExt =  version == 'vanilla' ? 'css': 'html';
      this.fs.copyTpl(
        this.templatePath(`src/${version}/_element-styles.${fileExt}`),
        this.destinationPath(`${elementName}-styles.${fileExt}`),
        this.props
      );
    } else {
      // copy the classes implementation for a style
      this.fs.copyTpl(
        this.templatePath(`src/${version}/_element-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    }

   
  },

  install: function () {

    this.installDependencies({
      bower:this.props.elementType === 'bower',
      npm: true
    });
  }

});
