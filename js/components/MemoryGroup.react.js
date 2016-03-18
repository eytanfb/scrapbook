import React from 'react';
import MemoryActions from '../actions/MemoryActions';
import classNames from 'classnames';
import Api from '../helpers/Api';
import Link from 'react-router';

class MemoryGroup extends React.Component {

  constructor(props) {
    super(props);
    this.showCategory = this.showCategory.bind(this);
  }

  showCategory() {
    const { name } = this.props;
    Api.fetchCategory(name);
  }

  /**
   * @return {object}
   */
  render() {
    const { src } = this.props;

    return (
      <div className='memory-group polaroid-image'>
        <a onClick={this.showCategory} >
          <img src={src} />
        </a>
      </div>
    );
  }
};

MemoryGroup.props = {name: '', src: ''};

export default MemoryGroup;
