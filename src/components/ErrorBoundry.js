import React, { Component } from 'react'

export default class ErrorBoundry extends Component {

  state = {
    hasError: false
  }

  static getDerivedStateFromErrors(error) {
    console.log(error);
    this.setState({hasError: true});
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true});
  }

  render() {
      if(this.state.hasError) {
    return (
      <div>
        <h1>Oops! Something went wrong..</h1>
        <h3> A team of monkies are on the case to resolve the issue as soon as possible. </h3>
      </div>
    )
  }
  else {
    return this.props.children;
  }
  }
}
