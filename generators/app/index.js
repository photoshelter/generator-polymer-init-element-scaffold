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
      name: 'elementVersion',
      message: 'What kind of element are you building?',
      choices: ['1.x', '2.0','vanilla'],
      default: '1.x'
    },

    {
      type: 'list',
      name: 'elementType',
      message: 'What kind of element are you building?',
      choices: this._elementOptions,
      default: 'component'
    },

    {
      type: 'list',
      name: 'elementImplementation',
      message: 'Is this a bower element or internal element?',
      choices: ['bower', 'internal'],
      default: 'bower'
    },
    {
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'elementDescription',
      message: 'What does this element do?',
      default: 'nothing yet'
    },
    {
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'authorName',
      message: 'What is your name?',
      default: 'author',
      store   : true
    },
    {
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'gitDomain',
      message: 'Where does your repo reside?',
      default: 'github',
      store   : true
    },
    {
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'orgName',
      message: 'What is your organiztion\'s repo?',
      default: 'org',
      store   : true
    },
    {
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'elementGrouping',
      message: 'What group does your element belong to?',
      default: 'none',
      store   : true
    },
    // // TODO: implement regex for tests inclusion
    // {
    //   when: (props) => (props.elementImplementation === 'bower'),
    //   type: 'confirm',
    //   name: 'testable',
    //   message: 'Would you like to include tests ?',
    //   default: true
    // },
    {
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
  
  _elementOptions:function(props) {
    if(props.elementVersion === '1.x') {
      return ['component','style', 'behavior']
    } else if(props.elementVersion === '2.0') {
      return ['component','behavior']
    } else {
      return ['component']
    }
  },

  _setDefaultValues: function() {

    this.props.authorName = this.props.authorName || 'internal';
    this.props.orgName = this.props.orgName || 'internal';
    this.props.elementDescription = this.props.elementDescription || 'internal';
    this.props.elementGrouping = this.props.elementGrouping || 'internal';
    this.props.testable = this.props.testable || false;
    this.props.sauceLabs = this.props.sauceLabs || false;
    this.props.gitDomain = this.props.gitDomain || 'github';

  },

  writing: function () {

    const elementVersion = this.props.elementVersion;
    const elementType = this.props.elementType;
    const elementName = this.props.elementName;

    this._sharedWrites();
    this._versionWrite(elementVersion, elementType, elementName);
  },

  _sharedWrites: function() {

    // copy all general files.
    this.fs.copyTpl(
      `${this.templatePath()}/**/!(_)*`,
      this.destinationPath(),
      this.props
    );

    // copy over dot files for bower.
    if (this.props.elementImplementation === 'bower') {
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


  _versionWrite:function(version, elementType, elementName) {

    // Copy the main html file.
    this.fs.copyTpl(
      this.templatePath(`src/${version}/${elementType}/_${elementType}.html`),
      this.destinationPath(`${elementName}.html`),
      this.props
    );


    //If it is a style type you need to copy over the file
    if(elementType === 'style') {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
      this.destinationPath(`${elementName}-classes.html`),
      this.props
      );
    } 
    
    // Each Version 
    if(version === '1.x') {
      this._PolymerOneWrite(version,elementType, elementName);
    }

    else if(version === '2.0') {
      this._PolymerTwoWrite(version,elementType, elementName);
    }

    else if(version === 'vanilla') {
      this._VanillaWrite(version, elementType, elementName);
    }
    
    
    // else if(elementType === 'behavior') {
    //     this.fs.copyTpl(
    //       this.templatePath(`demo/_${elementType}-demo.html`),
    //       this.destinationPath(`demo/${elementName}-demo.html`),
    //       this.props
    //     );
    //   } else {
    //     // copy over the script
    //     this.fs.copyTpl(
    //       this.templatePath(`src/${version}/${elementType}/_${elementType}.js`),
    //       this.destinationPath(`${elementName}.js`),
    //       this.props
    //     );

    //     // copy the component styles. css for vanilla and html for polymer
    //     const fileExt = elementType == 'vanilla' ? 'css': 'html';
    //     this.fs.copyTpl(
    //       this.templatePath(`src/${version}/${elementType}/_${elementType}-styles.${fileExt}`),
    //       this.destinationPath(`${elementName}-styles.${fileExt}`),
    //       this.props
    //     );
    //  }


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
  _PolymerTwoWrite: function(elementType, elementName) {

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
    }
    
  },
  _VanillaOneWrite: function(version, elementType, elementName) {

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

    this.installDependencies({
      bower:this.props.elementImplementation === 'bower',
      npm: true
    });
  }

});
