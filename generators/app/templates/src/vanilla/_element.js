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
   * Life cycle function that gets called when the element is
   * first attached to the DOM
   */
  connectedCallback() {
    const imported = ownerDoc.querySelector('#<%= elementName %>');
    const root = this.attachShadow({mode: 'open'});
    root.appendChild(document.importNode(imported.content, true));
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
