var React = require('react');
var ReactPropTypes = React.PropTypes;
var MemoryActions = require('../actions/MemoryActions');

var Footer = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return null;
    var allMemories = this.props.allMemories;
    var total = Object.keys(allMemories).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allMemories) {
      if (allMemories[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="memory-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  _onClearCompletedClick: function() {
    MemoryActions.destroyCompleted();
  }

});

module.exports = Footer;
