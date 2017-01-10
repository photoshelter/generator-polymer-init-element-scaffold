class <%=className%> extends Polymer.Element {

  static get is() { return '<%= elementName %>'; }

  static get config() {
    return {
      properties: {
        prop1: {
          type:String,
          value :'Working Correctly'
        }
        /**
         * A demo of a computed property
        **/
        computedProp: {
          type:String,
          computed: '_computeReverse(prop1)'
        }
      },
      observers: []
    }
  }

  /**
   * Inital Constructor for the class
   *  ---
   * The custom elements v1 spec forbids reading attributes, children, or parent
   * information from the DOM API in the constructor
   * -- Note:
   * Always call super
   */
  constructor() {
    super();
  }

  /**
   * Life cycle function that gets called when the element is
   * first attached to the DOM
  **/
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * Life cycle function that gets called when the element is
   * removed from the DOM
  **/
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  /**
   * For Polymer elements, only properties explicitly declared in the
   * properties object are tracked for attribute changes.
  **/
  attributeChangedCallback() {

  }

  /**
   * A public function  that doesnt do anything
   *
   * Just demonstating how to document methods
   *
   * @param {object} takes a baz object
   * @return {Bool}
   */
  foo(baz) {
    if (typeof baz === "undefined"){
       return false

    }
    return true;
  }

  /**
   * A private function for a computed property
   * Demonstating how to document private methods
   *
   * Returns a reservsed version of the string
   * @return {String}
  **/
  _computeReverse() {
    return  stringVal.split('').reverse().join('');
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

customElements.define(<%=className%>.is, <%=className%>);
