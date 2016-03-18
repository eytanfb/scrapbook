import React from 'react';

class MemoryDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { name, text } = this.props.memory;

    return (
      <div>
        <h3>{ name }</h3>
        <p>{ text }</p>
      </div>
    );
  }
}

MemoryDetail.defaultProps = {
  name: "",
  text: ""
};

export default MemoryDetail;
