import React from 'react'
import { FunctionComponent } from 'react'

const View: FunctionComponent = props => <text {...props}>{props.children}</text>
export default View
