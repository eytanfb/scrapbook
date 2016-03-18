import React from 'react';
import MemoryList from './MemoryList.react';
import MemoryDetail from './MemoryDetail.react';

class MemoryDisplay extends React.Component {
  
  constructor(props){
    super(props);
  }

  render() {
    const { category, memories, selectedMemory } = this.props;

    return(
      <div>
        <MemoryList classNames="30" category={category} memories={memories} />
        <MemoryDetail classNames="70" memory={selectedMemory} />
      </div>
    );
  }

}

MemoryDisplay.defaultProps = {
  category: "",
  memories: "",
  selectedMemory: {}
};

export default MemoryDisplay;
