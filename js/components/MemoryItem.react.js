var React = require('react');
var ReactPropTypes = React.PropTypes;

var classNames = require('classnames');

var MemoryItem = React.createClass({

  propTypes: {
   memory: ReactPropTypes.object.isRequired
  },

  render: function() {
    var memory = this.props.memory;

    return (
      <div>
        <a href='#'>{memory.text}</a>
        <br />
      </div>
    );
  }
});

module.exports = MemoryItem;
