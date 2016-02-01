import React from 'react';

import classNames from 'classnames';

class MemoryItem extends React.Component {

  render() {
    var memory = this.props.memory;

    return (
      <div>
        <a href='#'>{memory.text}</a>
        <br />
      </div>
    );
  }
};

export default MemoryItem;
