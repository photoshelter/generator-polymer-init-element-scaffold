let <%=className%> = (ParentEl) => class extends ParentEl {

  static get is() { return '<%= elementName %>'; }

  static get properties() {
        return {
          prop1: {
            type: String,
            value: 'world'
          }
        };
  }

  /**
   * Inital Constructor for the class
   *
   * Always call super
   */
  constructor() {
    super();
  }
  
  /**
   * A public function  that doesnt do anything
   *
   * Just demonstating how to document methods
   *
   * @param {object} baz a baz object
   * @return {null}
   */
  foo(baz) {
    return this._bar();
  }

  /**
   * A private that doesnt do anything
   *
   * Just demonstating how to document private methods
   *
   * @return {Boolean}
   */
  _bar() {
    return true;
  }


  _baz() {
    console.log(
     'Behavior BAZ'
    )
  }

  /**
   * ### Events
   */

  /**
   * Fired when <%= elementName %> does something
   *
   * @event <%= elementName %>-action
   */
};
