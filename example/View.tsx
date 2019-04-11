import React from 'react'
import { FunctionComponent } from 'react'

const View: FunctionComponent = props => <div {...props}>{props.children}</div>
export default View
