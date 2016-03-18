import React from 'react';

import classNames from 'classnames';

class MemoryListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  showMemory(id) {
    MemoryActions.showMemory(id);
  }

  render() {
    const { text, id } = this.props;

    return (
      <div>
        <a href='#' onClick={this.showMemory(id)}>{text}</a>
        <br />
      </div>
    );
  }
};

export default MemoryListItem;
