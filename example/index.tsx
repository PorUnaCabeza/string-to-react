import React from 'react'
import ReactDOM from 'react-dom'
import StringToReact from '../src/parser/parser'

class View extends React.Component {
  render() {
    return <div {...this.props}>{this.props.children}</div>
  }
}

let s = `<div>
          <div>hi</div>
          <View style={{fontSize: '12px'}}>hi</View>
        </div>`

let transform = function(tagName: string) {
  if (tagName === 'View') return View
  return null
}

ReactDOM.render(StringToReact(s, transform), document.getElementById('container'))
