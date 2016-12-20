# generator-polymer-init-element-scaffold

## Available Templates

The Goal of this generator is to be your one stop shop for any type of element that you are interested in making. It focuses on best practices, setting you up with a basic test suite, documentation, demos, and github pages deployment.

#### Template Support Matrix

Versions               | Type      | Supported
-----------------------|-----------|--------------------
Polymer 1.X            | Component | :white_check_mark:
Polymer 1.X            | Style     | :white_check_mark:
Polymer 1.X            | Behavior  | :white_check_mark:
Polymer 2.0            | Component | :white_check_mark:
Polymer 2.0            | Style     | :clock10:
Polymer 2.0            | Behavior  | :white_check_mark:
Vanilla Web Components | Component | :wavy_dash: :thought_balloon:
Vanilla Web Components | Style     | :interrobang:
Vanilla Web Components | Behavior  | :interrobang:


- Polymer 1.7 elements (Allows hybrid elements)
- Polymer 2.x elements (Still in prerelease)
  - [Classbased Behavior mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)
- Vanilla v1[webcomponents](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)

**These templates all have two versions -  `bower` and `internal`**

- The `bower` version is meant to stand alone as a project and includes all of the features listed below.
- The `internal` version is meant to be created within a project that already uses web components. Its can be used to create something purely presentational or as an adpater or extenstion for an existing component, It includes just the 3 main files.

## Features Support

- [x] [Gulp](http://gulpjs.com/) based build system.
- [x] [Browser Sync](https://www.browsersync.io/) for enjoyable development.

- Auto generated docs
 - [x] 1.x Component
 - [x] 1.x Style Library
- Basic travis testing support
  - [x] 1.7 Component
  - [x] 1.x Style Library
- Extended support for Sauce labs
  - [x] 1.7 Component
  - [x] 1.x Style Library
- Github pages deployment
  - [x] 1.7 Component
  - [x] 1.x Style Library

### Usage

- Install Global module dependencies
  - [Yeoman](http://yeoman.io)
  - [Polymer Cli](https://github.com/Polymer/polymer-cli)
  - [The Generator](https://www.npmjs.com/package/generator-polymer-init-element-scaffold)

```bash
npm install -g yo
npm install -g polymer-cli
npm install -g generator-polymer-init-element-scaffold
```

- Create folder ` mkdir new-ele` and move `cd new-ele` into it.
- Run `polymer init` to start it.
- Select `element-scaffold` and follow the instructions


### Development

- Clone the repo
- run [`npm link`](https://docs.npmjs.com/cli/link) in the project directory.
  - this will allow you to use the project as though you've installed it globally with npm.

#### Development Help

Watch [Polycasts Ep. 53](https://www.youtube.com/watch?v=A_OEdyhgnKc&list=PLNYkxOF6rcIDdS7HWIC_BYRunV6MHs5xo&index=1) to learn the basics of how this was built.
[Yeoman docs](http://yeoman.io/authoring/)

## License

MIT
