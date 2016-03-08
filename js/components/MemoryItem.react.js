import React from 'react';

import classNames from 'classnames';

class MemoryItem extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    const { text } = this.props;

    return (
      <div>
        <a href='#'>{text}</a>
        <br />
      </div>
    );
  }
};

export default MemoryItem;
