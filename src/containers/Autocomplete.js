import React, { PureComponent } from 'react'
import { Observable, pipe, of } from 'rxjs'
//import classnames from 'classnames'
// you should import `lodash` as a whole module
import lodash from 'lodash'
import { streamProps, stream } from 'react-streams'
import { withRouter } from 'react-router-dom'
import { ajax } from 'rxjs/ajax'
import { pluck, switchMap } from 'rxjs/operators'

const ITEMS_API_URL = 'https://randomuser.me/api/?results=10&inc=name&seed='
const DEBOUNCE_DELAY = 500

const getAutoComplete = pipe(
  switchMap(({ url, input }) => ajax(`${url}${input}`)),
  pluck('results')
)

const AutoComplete = streamProps(getAutoComplete)

// the exported component can be either a function or a class

class Autocomplete extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchItemsDebounced = lodash.debounce(this.fetchItems, DEBOUNCE_DELAY)
    this.state = {
      selectedItemIndex: 0,
      items: [],
      filteredItems: [],
      showItems: false,
      userInput: '',
      error: ''
    }
    this.onChange$ = new Observable()
  }

  fetchItems = () => {
    const { userInput } = this.state

    console.log('Calling fetch items with input ' + userInput)

    fetch(ITEMS_API_URL + userInput)
      .then(response => response.json())
      .then(
        json => {
          let { items } = this.state
          json.results.map(result => {
            if (!items.includes(result.name.first + ' ' + result.name.last)) {
              items.push(result.name.first + ' ' + result.name.last)
            }
          })

          const filteredItems = lodash.filter(
            items,
            item => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          )

          console.log('filtered items length is - ' + filteredItems.length)

          this.setState({
            selectedItemIndex: 0,
            filteredItems: filteredItems,
            showItems: true
          })
        },
        error => {
          this.setState({ showItems: false, error })
        }
      )
  }

  componentDidMount() {
    this.fetchItemsDebounced()
  }

  onChange = e => {
    const userInput = e.currentTarget.value
    console.log('Change detected: ' + userInput)
    this.setState({ userInput: e.currentTarget.value })
    this.fetchItemsDebounced()
  }

  onKeyDown = e => {
    const { selectedItemIndex, filteredItems } = this.state
    if (e.keyCode === 13) {
      this.setState({
        selectedItemIndex: 0,
        showItems: false,
        userInput: filteredItems[selectedItemIndex]
      })
    } else if (e.keyCode === 38) {
      if (selectedItemIndex === 0) {
        return
      }
      this.setState({ selectedItemIndex: selectedItemIndex - 1 })
    } else if (e.keyCode === 40) {
      if (selectedItemIndex - 1 === filteredItems.length) {
        return
      }

      this.setState({ selectedItemIndex: selectedItemIndex + 1 })
    }
  }

  onClick = e => {
    this.setState({
      selectedItemIndex: 0,
      filteredItems: [],
      showItems: false,
      userInput: e.currentTarget.innerText
    })
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: { selectedItemIndex, showItems, filteredItems, userInput }
    } = this

    let itemsListComponent

    if (showItems && userInput) {
      if (filteredItems.length > 0) {
        itemsListComponent = (
          <ul className="items">
            {filteredItems.map((item, index) => {
              let className
              if (index === selectedItemIndex) {
                className = 'item-active'
              }
              return (
                <li className={className} key={item} onClick={onClick}>
                  {item}
                </li>
              )
            })}
          </ul>
        )
      } else {
        itemsListComponent = (
          <div className="no-items">
            <em>No items to list!</em>
          </div>
        )
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
        <div className="list is-hoverable">{itemsListComponent}</div>
      </div>
    )
  }
}

export default withRouter(Autocomplete)
