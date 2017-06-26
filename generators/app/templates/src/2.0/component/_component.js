class <%=className%> extends Polymer.Element {

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

customElements.define(<%=className%>.is, <%=className%>);
