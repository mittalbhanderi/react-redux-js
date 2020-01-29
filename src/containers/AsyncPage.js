import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncPage extends PureComponent {
    static propTypes = {
      selectedType: PropTypes.string.isRequired,
      posts: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      dispatch: PropTypes.func.isRequired
    }
  
    componentDidMount() {
      const { dispatch, selectedType } = this.props
      dispatch(fetchPostsIfNeeded(selectedType))
    }
  
    componentDidUpdate(prevProps) {
      if (prevProps.selectedType !== this.props.selectedType) {
        const { dispatch, selectedType } = this.props
        dispatch(fetchPostsIfNeeded(selectedType))
      }
    }
  
    handleChange = nextSubreddit => {
      this.props.dispatch(selectSubreddit(nextSubreddit))
    }
  
    handleRefreshClick = e => {
      e.preventDefault()
  
      const { dispatch, selectedType } = this.props
      dispatch(invalidateSubreddit(selectedType))
      dispatch(fetchPostsIfNeeded(selectedType))
    }
  
    render() {
      const { selectedType, posts, isFetching, lastUpdated } = this.props
      const isEmpty = posts.length === 0
      return (
        <div>
          <Picker value={selectedType}
                  onChange={this.handleChange}
                  options={[ 'reactjs', 'frontend', 'backend', 'java', 'angular', 'angularjs' ]} />
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                {' '}
              </span>
            }
            {!isFetching &&
              <button onClick={this.handleRefreshClick}>
                Refresh
              </button>
            }
          </p>
          {isEmpty
            ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Posts posts={posts} />
              </div>
          }
        </div>
      )
    }
  }
  
  const mapStateToProps = state => {
    const { selectedType, postsByType } = state
    const {
      isFetching,
      lastUpdated,
      items: posts
    } = postsByType[selectedType] || {
      isFetching: true,
      items: []
    }
  
    return {
      selectedType,
      posts,
      isFetching,
      lastUpdated
    }
  }
  

export default withRouter(connect(mapStateToProps,)(AsyncPage))