import React from 'react';
import PropTypes from 'react';

var ENTER_KEY_CODE = 13;

class MemoryTextInput extends React.Component {

  constructor(props) {
    super(props);
    this._save = this._save.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this.state = { value: "" };
  }

  /**
   * @return {object}
   */
  render() /*object*/ {
    return (
      <input
        id={'new-memory'}
        placeholder="What did you do?"
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
      />
    );
  }

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  }

  /**
   * @param {object} event
   */
  _onChange(event) {
    this.setState({
      value: event.target.value.toLowerCase()
    });
  }

  /**
   * @param  {object} event
   */
  _onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }
};

MemoryTextInput.defaultProps = {
  onSave: () => {},
};

export default MemoryTextInput;
