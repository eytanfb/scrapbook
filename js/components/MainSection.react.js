import React from 'react';
import MemoryActions from '../actions/MemoryActions';
import MemoryGroup from './MemoryGroup.react';
import MemoryDisplay from './MemoryDisplay.react';
import _ from "underscore";

class MainSection extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   * @return {object}
   */
  render() {
    const props = this.props.props;

    let display = <h3>Loading...</h3>;
    if (props.memoryGroups) {
      display = _.first(_.shuffle(props.memoryGroups), 3).map(function (group) {
        const key = group.name + "-" + Date.now();
        return <MemoryGroup key={key} src={group.image} name={group.name} />;
      });
    } 

    if (props.category && props.category.length > 0  && props.memories && props.memories.length > 0) {
      const { category, memories } = props;
      display = <MemoryDisplay category={category} memories={memories} />
    } 

    return (
      <section id="main">
        {display}
      </section>
    );
  }
};

MainSection.defaultProps = {
  props: {}
};

export default MainSection;
