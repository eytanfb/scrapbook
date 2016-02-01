import React from 'react';
import MemoryActions from '../actions/MemoryActions';
import MemoryTextInput from './MemoryTextInput.react';

class Header extends React.Component {

  /**
   * @return {object}
   */
  render() {
    return (
      <header>
        <div id="header">
          <MemoryTextInput
            id="new-memory"
            placeholder="What did you do?"
            onSave={this._onSave}
          />
        </div>
      </header>
    );
  }

  /**
   * Event handler called within MemoryTextInput.
   * Defining this here allows MemoryTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave(text) {
    if (text.trim()){
      MemoryActions.create(text);
    }
  }
};

export default Header;
