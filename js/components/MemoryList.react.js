var React = require('react');
var ReactPropTypes = React.PropTypes;
var MemoryItem = require('./MemoryItem.react');
var MemoryStore = require('../stores/MemoryStore');

var MemoryList = React.createClass({

  getInitialState: function() {
    return { memories: [], category: "" };
  },

  componentDidMount: function () {
    MemoryStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    MemoryStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var memories = this.state.memories;
    var category = this.state.category;
    var memoryItems = [];

    if (memories) {
      memoryItems = Object.keys(memories).map(function (key) {
        var memory = memories[key];
        return <MemoryItem key={key} memory={memory} />
      });
    }

    return (
      <div>
        <h4>{category}</h4>
        {memoryItems}
      </div>
    );
  },

  _onChange: function () {
    var memoriesByCategory = MemoryStore.getMemoriesByCategory();
    var category = memoriesByCategory.category;
    var memories = memoriesByCategory.memories;
    this.setState({category: category, memories: memories});
  }
});

module.exports = MemoryList;
