var React = require('react');
var ReactPropTypes = React.PropTypes;
var MemoryActions = require('../actions/MemoryActions');
var MemoryGroup = require('./MemoryGroup.react');
var _ = require("underscore");

var MainSection = React.createClass({

  propTypes: {
    memoryGroups: ReactPropTypes.array.isRequired
  },

  getInitialState: function () {
    return { memoryGroups: [] };
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are memories.

    var groups = _.first(_.shuffle(this.props.memoryGroups), 3).map(function (group) {
        var key = group.name + "-" + Date.now();
        return <MemoryGroup key={key} src={group.image} name={group.name} />
    });

    return (
      <section id="main">
        {groups}
      </section>
    );
  }

});

module.exports = MainSection;
