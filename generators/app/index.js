'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);
    this.appname = this._dashedCaseFromSpaces(this.appname);
  },




/*
__ GREETING ________________________________________________________________________________________________ */

  prompting: function () {

    this.log(yosay(
      'Welcome to the solid ' + chalk.red('generator-polymer-init-element-scaffold') + ' generator!'
    ));




/*
__ PROMPTS ________________________________________________________________________________________________ */

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

    { /* BEHAVIOR: Extension */
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
      default: this._directoryOptions
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
      type: 'input',
      name: 'gitDomain',
      message: 'Where does your repo reside?',
      default: 'github',
      store: true
    },

    { /* ORG */
      when: (props) => (props.elementImplementation === 'bower'),
      type: 'input',
      name: 'orgName',
      message: 'What is your organiztion\'s repo?',
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
  

  _elementOptions: function(props) {
    if(props.elementVersion === '1.x') {
      return ['component','style', 'behavior']
    } else if(props.elementVersion === '2.0') {
      return ['component','behavior']
    } else {
      return ['component']
    }
  },


  _directoryOptions: function(props) {
    if (props.elementImplementation === 'bower') {
      return false
    } else if (props.elementImplementation === 'internal') {
      return true
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





/*
__ WRITING ________________________________________________________________________________________________ */

  writing: function () {

    const elementVersion = this.props.elementVersion;
    const elementType = this.props.elementType;
    const elementName = this.props.elementName;

    this._sharedWrites(elementName); // ??? Put at bottom ???
    this._versionWrite(elementVersion, elementType, elementName);
  },



/*
__ SHARED WRITES _____________________________________________ */

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
    }

  },



/*
__ VERSION WRITES _____________________________________________ */

  _versionWrite: function(version, elementType, elementName) {



                            /* ::: HTML: Copy main file over ::: */ 


    // USER SELECTED: 'bower' + 'No directory'
    if (this.props.elementImplementation === 'bower' && this.props.createDirectory === false) {

      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.html`),
        this.destinationPath(`${elementName}.html`),
        this.props
      );
    }

    // USER SELECTED: 'bower' + 'Yes directory'
    else if (this.props.elementImplementation === 'bower' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.html`),
        this.destinationPath(`${elementName}/${elementName}.html`),
        this.props
      );
    }

    // USER SELECTED: 'internal' + 'No directory'
    else if (this.props.elementImplementation === 'internal' && this.props.createDirectory === false) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.html`),
        this.destinationPath(`${elementName}.html`),
        this.props
      );
    } 

    // USER SELECTED: 'internal' + 'Yes directory'
    else if (this.props.elementImplementation === 'internal' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.html`),
        this.destinationPath(`${elementName}/${elementName}.html`),
        this.props
      );
    } 




                            /* ::: STYLE: Copy style file over ::: */ 

    // USER SELECTED: 'style' + 'bower' + 'No directory'
    if (elementType === 'style' && this.props.elementImplementation === 'bower' && this.props.createDirectory === false) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    }

    // USER SELECTED: 'style' + 'bower' + 'Yes directory'
    else if (elementType === 'style' && this.props.elementImplementation === 'bower' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}/${elementName}-classes.html`),
        this.props
      );
    }

    // USER SELECTED: 'style' + 'internal' + 'No directory'
    else if (elementType === 'style' && this.props.elementImplementation === 'internal' && this.props.createDirectory === false) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    }

    // USER SELECTED: 'style' + 'internal' + 'Yes directory'
    else if (elementType === 'style' && this.props.elementImplementation === 'internal' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}/${elementName}-classes.html`),
        this.props
      );
    } 




                                      /* ::: VERSIONS ::: */ 

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



/*
__ POLYMER 1.0 _____________________________________________ */

  _PolymerOneWrite: function(version, elementType, elementName) {


                                                    /* ::: COMPONENT ::: */ 

    // USER SELECTED: 'component' + 'bower' + 'No directory'
    if (elementType === 'component' && this.props.elementImplementation === 'bower' && this.props.createDirectory === false) {
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

    // USER SELECTED: 'component' + 'bower' + 'Yes directory'
    else if (elementType === 'component' && this.props.elementImplementation === 'bower' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.js`),
        this.destinationPath(`${elementName}/${elementName}.js`),
        this.props
      );
      
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-styles.html`),
        this.destinationPath(`${elementName}/${elementName}-styles.html`),
        this.props
      );
    }

    // USER SELECTED: 'component' + 'internal' + 'No directory'
    else if (elementType === 'component' && this.props.elementImplementation === 'internal' && this.props.createDirectory === false) {
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

    // USER SELECTED: 'component' + 'internal' + 'Yes directory'
    else if (elementType === 'component' && this.props.elementImplementation === 'internal' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}.js`),
        this.destinationPath(`${elementName}/${elementName}.js`),
        this.props
      );
      
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-styles.html`),
        this.destinationPath(`${elementName}/${elementName}-styles.html`),
        this.props
      );
    }
    

                                                    /* ::: STYLE ::: */ 

    // USER SELECTED: 'style' + 'bower' + 'No directory'
    if (elementType === 'style' && this.props.elementImplementation === 'bower' && this.props.createDirectory === false) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    } 

    // USER SELECTED: 'style' + 'bower' + 'Yes directory'
    else if (elementType === 'style' && this.props.elementImplementation === 'bower' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}/${elementName}-classes.html`),
        this.props
      );
    } 

    // USER SELECTED: 'style' + 'internal' + 'No directory'
    else if (elementType === 'style' && this.props.elementImplementation === 'internal' && this.props.createDirectory === false) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}-classes.html`),
        this.props
      );
    } 

    // USER SELECTED: 'style' + 'internal' + 'Yes directory'
    else if (elementType === 'style' && this.props.elementImplementation === 'internal' && this.props.createDirectory === true) {
      this.fs.copyTpl(
        this.templatePath(`src/${version}/${elementType}/_${elementType}-classes.html`),
        this.destinationPath(`${elementName}/${elementName}-classes.html`),
        this.props
      );
    } 






    // Behavior
    if (elementType === 'behavior') {
      this.fs.copyTpl(
        this.templatePath(`demo/_${elementType}-demo.html`),
        this.destinationPath(`demo/${elementName}-demo.html`),
        this.props
      );
    }

  },




/*
__ POLYMER 2.0 _____________________________________________ */

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




/*
__ VANILLA _____________________________________________ */

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





/*
__ INSTALL ________________________________________________________________________________________________ */

  install: function () {

    this.installDependencies({
      bower: this.props.elementImplementation === 'bower',
      npm: true
    });
  }

});