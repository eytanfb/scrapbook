import React from 'react';
import MemoryItem from './MemoryItem.react';
import MemoryStore from '../stores/MemoryStore';

class MemoryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { memories, category } = this.props;
    let memoryItems = [];

    if (memories) {
      memoryItems = memories.map(function(memory) {
          const { text, id } = memory;
          return <MemoryItem key={id} text={memory.text}/>
      });
    }

    return (
      <div>
        <h2>{category}</h2> 
        {memoryItems} 
      </div>
    );
  }
};

MemoryList.defaultProps = {
  category: "",
  memories: []
};

export default MemoryList;
