import React from 'react';
import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';
import MemoryList from './MemoryList.react';
import MemoryStore from '../stores/MemoryStore';
import Api from '../helpers/api';

class ScrapbookApp extends React.Component {

  constructor() {
    super();
    this.state = {
      memoryGroups: []
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MemoryStore.addChangeListener(this._onChange);
    Api.fetchCategories();
  }

  componentWillUnmount() {
    MemoryStore.removeChangeListener(this._onChange);
  }

  /**
   * @return {object}
   */
  render() {
    return ( 
        <div>
          <Header />
          <MainSection memoryGroups={this.state.memoryGroups}/>
          <br />
          <MemoryList />
        </div>
    );
  }

  _onChange() {
    this.setState({memoryGroups: MemoryStore.getAllMemoryGroups()});
  }
};

export default ScrapbookApp;
