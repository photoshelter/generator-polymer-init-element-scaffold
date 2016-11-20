Polymer({
  is: '<%= elementName %>',

  properties: {
    /**
     * A  test property to show off the docs.
    **/
    prop1: {
      type:String,
      value :'TEST'
    }
  },

  /**
   * Called when the element has been created, but before property values
   * are set and local DOM is initialized. Use for one-time set-up
   * before property values are set.
  **/
  created: function() {

  },

  /**
   * Called after property values are set and local DOM
   * is initialized. Use for one-time configuration of your
   * component after local DOM is initialized.
  **/
  ready: function() {

  },

  /**
   * Life cycle function that gets called when the element is
   * first attached to the DOM
  **/
  attached: function () {

  },

  /**
   * Called after the element is detached from the document.
   * Can be called multiple times during the lifetime of an element.
   * Uses include removing event listeners added in
  **/
  detached: function () {

  },


  /**
   * Called when one of the element's attributes is changed.
   * Use to handle attribute changes that don't correspond
   * to declared properties.
  **/
  attributeChanged: function () {

  },

  /**
   * A public function  that doesnt do anything
   *
   * Just demonstating how to document methods
   *
   * @param {object} takes a baz object
   * @return {null}
  **/
  foo: function (baz) {
    return this._bar();
  },

  /**
   * A private that doesnt do anything
   * Just demonstating how to document private methods
   *
   * @return {null}
  **/
  _bar: function () {
    return true;
  }

  /**
   * ### Events
  **/

  /**
   * Fired when <%= elementName %> does something
   *
   * @event <%= elementName %>-action
  **/

});
