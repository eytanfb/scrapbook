import React from 'react';
import MemoryListItem from './MemoryListItem.react';
import MemoryStore from '../stores/MemoryStore';

class MemoryList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { memories, category } = this.props;
    let memoryListItems = [];

    if (memories) {
      memoryListItems = memories.map(function(memory) {
          const { text, id } = memory;
          return <MemoryListItem key={id} id={id} text={memory.text}/>
      });
    }

    return (
      <div>
        <h2>{category}</h2> 
        {memoryListItems} 
      </div>
    );
  }
};

MemoryList.defaultProps = {
  category: "",
  memories: []
};

export default MemoryList;
