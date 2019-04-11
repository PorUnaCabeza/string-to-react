import React from 'react'
import ReactDOM from 'react-dom'
import StringToReact from '../src/parser/parser'
import View from './View'

let s = `<div>
          <div>hi</div>
          <View style={{fontSize: '12px'}}>hi</View>
        </div>`

let transform = function(tagName: string) {
  if (tagName === 'View') return View
  return null
}

ReactDOM.render(StringToReact(s, transform), document.getElementById('container'))
