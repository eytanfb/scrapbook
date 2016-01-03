var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var MemoryList = require('./MemoryList.react');
var React = require('react');
var MemoryStore = require('../stores/MemoryStore');
var Api = require('../helpers/api');

var ScrapbookApp = React.createClass({

  getInitialState: function() {
    return {memoryGroups: []};
  },

  componentDidMount: function () {
    MemoryStore.addChangeListener(this._onChange);
    Api.fetchCategories();
  },

  componentWillUnmount: function() {
    MemoryStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <Header />
        <MainSection
          memoryGroups={this.state.memoryGroups}
        />
        <br />
        <MemoryList />
      </div>
    );
  },

  _onChange: function() {
    this.setState({memoryGroups: MemoryStore.getAllMemoryGroups()});
  }

});

module.exports = ScrapbookApp;
