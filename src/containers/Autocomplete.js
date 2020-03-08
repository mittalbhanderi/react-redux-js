import React, { useState } from "react";
//import classnames from 'classnames'
// you should import `lodash` as a whole module
import lodash from "lodash";
import { withRouter } from "react-router-dom";

const ITEMS_API_URL = "https://randomuser.me/api/?results=10&inc=name&seed=";
const DEBOUNCE_DELAY = 500;

// const getAutoComplete = pipe(
//   switchMap(({ url, input }) => ajax(`${url}${input}`)),
//   pluck('results')
// )

// const AutoComplete = streamProps(getAutoComplete)

// the exported component can be either a function or a class

function Autocomplete() {

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItems, setShowItems] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  function fetchItems() {
    console.log("Calling fetch items with input " + userInput);

    fetch(ITEMS_API_URL + userInput)
      .then(response => response.json())
      .then(
        json => {
          let data = items || [];
          json.results.map(result => {
            if (!data.includes(result.name.first + " " + result.name.last)) {
              data.push(result.name.first + " " + result.name.last);
            }
          });

          setItems(data);

          const filteredItems = lodash.filter(
            data,
            item => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          );

          console.log("filtered items length is - " + filteredItems.length);

          setSelectedItemIndex(0);
          setFilteredItems(filteredItems);
          setShowItems(true);
        },
        err => {
          setShowItems(false);
          setError(err);
          console.error(error);
        }
      );
  };

  const onChange = e => {
    const userInput = e.currentTarget.value;
    console.log("Change detected: " + userInput);
    setUserInput(e.currentTarget.value);
    lodash.debounce(fetchItems, DEBOUNCE_DELAY)();
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setSelectedItemIndex(0);
      setShowItems(false);
      setUserInput(filteredItems[selectedItemIndex]);
    } else if (e.keyCode === 38) {
      if (selectedItemIndex === 0) {
        return;
      }
      setSelectedItemIndex(selectedItemIndex - 1);
    } else if (e.keyCode === 40) {
      if (selectedItemIndex - 1 === filteredItems.length) {
        return;
      }
      setSelectedItemIndex(selectedItemIndex + 1);
    }
  };

  const onClick = e => {
    setSelectedItemIndex(0);
    setFilteredItems([]);
    setShowItems(false);
    setUserInput(e.currentTarget.innerText);
  };

  let itemsListComponent;

  if (showItems && userInput) {
    if (filteredItems.length > 0) {
      itemsListComponent = (
        <ul className="items">
          {filteredItems.map((item, index) => {
            let className;
            if (index === selectedItemIndex) {
              className = "item-active";
            }
            return (
              <li className={className} key={item} onClick={onClick}>
                {item}
              </li>
            );
          })}
        </ul>
      );
    } else {
      itemsListComponent = (
        <div className="no-items">
          <em>No items to list!</em>
        </div>
      );
    }
  }

  return (
    <div className="wrapper">
      <h1>Auto complete demo:</h1>
      <div className="control p10">
        <label htmlFor="user-input">Please specify a name: </label>
        <input
          type="text"
          name="user-input"
          className="input"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </div>
      <div
        className="list is-hoverable"
        style={{ maxHeight: 300, width: 350, overflow: "auto" }}
      >
        {itemsListComponent}
      </div>
    </div>
  );
};

export default withRouter(Autocomplete);
