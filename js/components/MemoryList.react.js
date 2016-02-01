import React from 'react';
import MemoryItem from './MemoryItem.react';
import MemoryStore from '../stores/MemoryStore';

class MemoryList extends React.Component {

  constructor() {
    super();
    this.state = {
      memories: [],
      category: ""
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MemoryStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MemoryStore.removeChangeListener(this._onChange);
  }

  render() {
    var memories = this.state.memories;
    var category = this.state.category;
    var memoryItems = [];

    if (memories) {
      memoryItems = Object.keys(memories).map(function(key) {
          var memory = memories[key];
          return <MemoryItem key = {
            key
          }
          memory = {
            memory
          }
          />
      });
    }

    return (
      <div>
        <h4>{category}</h4 > {
            memoryItems
          } < /div>
    );
  }

  _onChange() {
    var memoriesByCategory = MemoryStore.getMemoriesByCategory();
    var category = memoriesByCategory.category;
    var memories = memoriesByCategory.memories;
    this.setState({
      category: category, 
      memories: memories
    });
  }
};

export default MemoryList;
