import React from 'react';
import MemoryActions from '../actions/MemoryActions';
import MemoryGroup from './MemoryGroup.react';
import _ from "underscore";

class MainSection extends React.Component {

  constructor() {
    super();
    this.state = { memoryGroups: [] };
  }

  /**
   * @return {object}
   */
  render() {
    // This section should be hidden by default
    // and shown when there are memories.

    var groups = _.first(_.shuffle(this.props.memoryGroups), 3).map(function (group) {
        var key = group.name + "-" + Date.now();
        return <MemoryGroup key={key} src={group.image} name={group.name} />
    });

    return (
      <section id="main">
        {groups}
      </section>
    );
  }

};

export default MainSection;
