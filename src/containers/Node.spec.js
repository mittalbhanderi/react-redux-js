import React from "react";
import { NodeContainer } from "./Node";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

describe("Node Container Component Tests", () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  async function setup(id, counter, childNodeIds, parentId) {
    const actions = {
      increment: jest.fn(),
      removeChild: jest.fn(),
      deleteNode: jest.fn(),
      createNode: jest.fn(),
      addChild: jest.fn(),
      store: jest.fn()
    };

    const eventArgs = {
      preventDefault: jest.fn()
    };

    return new Promise(resolve => {
      act(() => {
        render(
          <NodeContainer
            id={id}
            counter={counter}
            parentId={parentId}
            childNodeIds={childNodeIds}
            {...actions}
          />,
          container
        );

        resolve({
          component: container,
          removeLink: container.querySelector("[data-testid=remove]"),
          addLink: container.querySelector("[data-testid=add]"),
          button: container.querySelector("[data-testid=increment]"),
          actions: actions,
          eventArgs: eventArgs
        });
      });
    });
  }

  it("should display counter", () => {
    setup(1, 23, []).then(({ component, addLink }) => {
      expect(component.innerHTML).toContain("Counter: 23");
      expect(addLink.innerHTML).toEqual("Add child");
    });
  });

  it("should call increment button", () => {
    setup(1, 2, []).then(({ button, actions }) => {
      act(() => {
        button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(actions.increment).toBeCalledWith(1);
    });
  });

  it("should not render remove link", () => {
    setup(1, 2, []).then(({ removeLink }) => {
      expect(removeLink).toBeNull();
    });
  });

  it("should call createNode action on Add child click", () => {
    setup(2, 1)
      .then(({ addLink, actions, eventArgs }) => {
        actions.createNode.mockReturnValue({ nodeId: 3 });
        act(() => {
          addLink.dispatchEvent(
            new MouseEvent("click", { eventArgs, bubbles: true })
          );
        });
        expect(actions.createNode).toBeCalled();
      });
  });

  it("should call deleteNode action on Remove click", () => {
    setup(2, 1, [3, 4])
      .then(({ component, removeLink, actions, eventArgs }) => {
          console.log(component.innerHTML);
          
        act(() => {
          removeLink.dispatchEvent(
            new MouseEvent("click", { eventArgs, bubbles: true })
          );
        });
        expect(actions.removeChild).toBeCalled();
      });
  });
});
