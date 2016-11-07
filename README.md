# generator-polymer-init-element-scaffold

## Available Templates

- Polymer 1.7 elements (Allows hybrid elements)
- Polymer 2.x elements (Still in prerelease)
- Vanilla v1 [webcomponents](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
- [Classbased mixins](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)

**These templates all have two versions -  `bower` and `implementation`** 

- The `bower` version is meant to stand alone as a project and includes all of the features listed below.
- The `implementation` version is meant to be created within a project that already uses web components, and just has 3 files. 

## Features

- Auto generated docs 
 - [x] 1.7 support
 - [ ] 2.x support
 - [ ] Vanilla support
 - [ ] Mixin support
- Basic travis testing support
  - [x] 1.7 support
- Extended support for Sauce labs
  - [x] 1.7 support
- One line github pages deployment
  - [x] 1.7 support


### Usage

- Install [Yeoman](http://yeoman.io)

```bash
npm install -g yo
```
- Install the [Polymer Cli](https://github.com/Polymer/polymer-cli)
```bash
npm install -g polymer-cli
```

- Install the [generator](https://www.npmjs.com/package/generator-polymer-init-element-scaffold)
```bash
npm install -g generator-polymer-init-element-scaffold
```

- Create your element in the folder you want to add it to. 
```bash
polymer init
```

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
