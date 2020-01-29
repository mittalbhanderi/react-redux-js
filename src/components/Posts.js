import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => {
    return (
        <>
          { posts.map((post, i) =>
            <React.Fragment key={i}>
                <h3>{i + 1 + '. ' + post.title}</h3>
                { post.selftext_html && <span dangerouslySetInnerHTML={{__html: post.selftext_html}} /> }
            </React.Fragment>
          )}      
        </>
    )
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}

export default Posts
