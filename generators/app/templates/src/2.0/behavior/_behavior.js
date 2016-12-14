let <%=className%> = (ParentEl) => class extends ParentEl {

  static get is() { return '<%= elementName %>'; }

  static get config() {
    return {
      properties: {
        prop1: {
          type:String,
          value :'TEST'
        }
      },
      observers: []
    }
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
   * @param {object} takes a baz object
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
   * @return {null}
   */
  _bar() {
    return true;
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
