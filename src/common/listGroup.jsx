import React from "react";
import PropTypes from "prop-types";

const ListGroup = props => {
  const { listItems, activeItem, onListSelection } = props;
  const listRows = item => {
    let classNames = "list-group-item";
    if (item === activeItem) {
      classNames = "list-group-item active";
    } else {
      classNames = "list-group-item";
    }
    return (
      <li
        onClick={() => onListSelection(item)}
        className={classNames}
        key={item}
      >
        {item}
      </li>
    );
  };

  return (
    <ul className="list-group" style={{ cursor: "pointer" }}>
      {listItems.map(listRows)}
    </ul>
  );
};

ListGroup.propTypes = {
  listItems: PropTypes.array.isRequired,
  activeItem: PropTypes.string,
  onListSelection: PropTypes.func.isRequired
};

export default ListGroup;
