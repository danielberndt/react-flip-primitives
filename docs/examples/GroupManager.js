import React from "react";
import PropTypes from "prop-types";

export default class GroupManager extends React.Component {
  static propTypes = {
    groupCount: PropTypes.number,
    itemCount: PropTypes.number,
    children: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const {groupCount, itemCount} = props;
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      items.push({id: i, groupIndex: Math.floor(Math.random() * groupCount)});
    }
    this.nextId = itemCount - 1;
    this.state = {items};
  }

  addItem = () => {
    const {items} = this.state;
    const newItem = {
      id: (this.nextId += 1),
      groupIndex: Math.floor(Math.random() * this.props.groupCount),
    };
    this.setState({items: [...items, newItem]});
  };

  removeItem = item => {
    const {items} = this.state;
    this.setState({items: items.filter(i => i.id !== item.id)});
  };

  swapItem = item => {
    const {items} = this.state;
    const {groupCount} = this.props;
    const newGroupIndex =
      (item.groupIndex + Math.floor(Math.random() * (groupCount - 1)) + 1) % groupCount;
    this.setState({
      items: items.map(i => (item.id === i.id ? {...i, groupIndex: newGroupIndex} : i)),
    });
  };

  render() {
    return this.props.children({
      items: this.state.items,
      addItem: this.addItem,
      removeItem: this.removeItem,
      swapItem: this.swapItem,
    });
  }
}