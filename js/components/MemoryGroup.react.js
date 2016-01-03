var React = require('react');
var ReactPropTypes = React.PropTypes;
var MemoryActions = require('../actions/MemoryActions');
var classNames = require('classnames');
var Api = require('../helpers/Api');

var MemoryGroup = React.createClass({

  propTypes: {
   name: ReactPropTypes.string.isRequired,
   src: ReactPropTypes.string.isRequired
  },

  getInitialState: function() {
    return null;
  },

  showCategory: function () {
    var category = this.props.name;
    Api.fetchCategory(category);
  },

  /**
   * @return {object}
   */
  render: function() {
    var src = this.props.src;

    return (
      <div className='memory-group polaroid-image'>
        <a href='#' onClick={this.showCategory} title={this.props.name}>
          <img src={src} />
        </a>
      </div>
    );
  }
});

module.exports = MemoryGroup;
