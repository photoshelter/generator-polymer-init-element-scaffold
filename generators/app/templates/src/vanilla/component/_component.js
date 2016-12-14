// TODO: remove this funciton wrap so these work with other components

(function () {
const ownerDoc = ownerDoc || document.currentScript.ownerDocument;
class <%=className%> extends HTMLElement {

  static get is() {
    return '<%= elementName %>';
  }

  constructor() {
    super();
  }

  /**
   * Called every time the element is inserted into the DOM. Useful for
   * running setup code, such as fetching resources or rendering. Generally,
   * you should try to delay work until this time.
  **/
  connectedCallback() {
    super.connectedCallback();
    const imported = ownerDoc.querySelector('#<%= elementName %>');
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(document.importNode(imported.content, true));
  }

  /**
   * Called every time the element is removed from the DOM. Useful
   * for running clean up code (removing event listeners, etc.).
  **/
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * An attribute was added, removed, updated, or replaced. Also
   * called for initial values when an element is created by the
   * parser, or upgraded. Note: only attributes listed in the
   * observedAttributes property will receive this callback.
  **/
  attributeChangedCallback(attrName, oldVal, newVal) {
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
   * A "private" that doesnt do anything
   *
   * Just demonstating how to document private methods
   *
   * @return {null}
   */
  _bar () {
    return true;
  }

};

customElements.define(<%=className%>.is, <%=className%>);

})();
