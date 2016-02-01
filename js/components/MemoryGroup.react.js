import React from 'react';
import MemoryActions from '../actions/MemoryActions';
import classNames from 'classnames';
import Api from '../helpers/Api';

class MemoryGroup extends React.Component {

  showCategory() {
    var category = this.props.name;
    Api.fetchCategory(category);
  }

  /**
   * @return {object}
   */
  render() {
    var src = this.props.src;
    var href = '/category/' + this.props.name;

    return (
      <div className='memory-group polaroid-image'>
        <a href={href} onClick={this.showCategory} title={this.props.name}>
          <img src={src} />
        </a>
      </div>
    );
  }
};

export default MemoryGroup;
