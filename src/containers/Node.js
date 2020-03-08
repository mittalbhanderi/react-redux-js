import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/tree-view";
import { withRouter } from "react-router-dom";

export const NodeContainer = (props) => {

  const handleIncrementClick = e => {
    e.preventDefault();
    const { increment, id } = props;
    increment(id);
  };

  const handleAddChildClick = e => {
    e.preventDefault();
    const { addChild, createNode, id } = props;
    const childId = createNode().nodeId;
    addChild(id, childId);
  };

  const handleRemoveClick = e => {
    e.preventDefault();

    const { removeChild, deleteNode, parentId, id } = props;
    removeChild(parentId, id);
    deleteNode(id);
  };

  const renderChild = childId => {
    const { id } = props;
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    );
  };

  const { counter, parentId, childNodeIds } = props;

  return (
    <div>
      <summary>
        Counter: {counter}{" "}
        <button data-testid="increment" onClick={handleIncrementClick}>
          +
        </button>{" "}
      </summary>
      {typeof parentId !== "undefined" && (
        <a
          data-testid="remove"
          href="#"
          onClick={handleRemoveClick} // eslint-disable-line jsx-a11y/anchor-is-valid
          style={{ color: "lightgray", textDecoration: "none" }}
        >
          Remove child
        </a>
      )}
      <ul>
        {childNodeIds && childNodeIds.map(renderChild)}
        <li key="add">
          <a
            href="#" // eslint-disable-line jsx-a11y/anchor-is-valid
            data-testid="add"
            onClick={handleAddChildClick}
          >
            Add child
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.nodes[ownProps.id || 0],
    id: ownProps.id || 0
  };
};

const ConnectedNode = connect(mapStateToProps, actions)(NodeContainer);
export default withRouter(ConnectedNode);
