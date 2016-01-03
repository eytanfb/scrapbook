var React = require('react');
var MemoryActions = require('../actions/MemoryActions');
var MemoryTextInput = require('./MemoryTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <header>
        <div id="header">
          <MemoryTextInput
            id="new-memory"
            placeholder="What did you do?"
            onSave={this._onSave}
          />
        </div>
      </header>
    );
  },

  /**
   * Event handler called within MemoryTextInput.
   * Defining this here allows MemoryTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      MemoryActions.create(text);
    }
  }
});

module.exports = Header;
