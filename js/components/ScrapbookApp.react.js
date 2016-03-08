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
      props: {}
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    MemoryStore.addChangeListener(this._onChange);
    if (localStorage.getItem("_memoryGroups") == undefined) {
      Api.fetchCategories();
    } else {
      const initialState = MemoryStore.getInitialState();
      this.setState(initialState);
    }
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
          <MainSection props={this.state.props}/>
          <br />
          <MemoryList />
        </div>
    );
  }

  _onChange() {
    const currentState = MemoryStore.getCurrentState();
    this.setState(currentState);
  }
};

export default ScrapbookApp;
