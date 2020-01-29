import React from 'react'
import ConnectedNode from './Node'
import {withRouter} from 'react-router-dom'

function NodeContainer() {
    return (
        <ConnectedNode id={0} />
    )
}

export default withRouter(NodeContainer)
