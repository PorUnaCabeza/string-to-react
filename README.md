## String to React

[![Build Status](https://travis-ci.org/PorUnaCabeza/string-to-react.svg?branch=master)](https://travis-ci.org/PorUnaCabeza/string-to-react) [![Coverage Status](https://coveralls.io/repos/github/PorUnaCabeza/string-to-react/badge.svg)](https://coveralls.io/github/PorUnaCabeza/string-to-react) [![npm](https://img.shields.io/npm/v/string-to-react.svg)](https://www.npmjs.com/package/string-to-react)

A tool to convert JSX strings into React Components

### Installation:

```
npm install string-to-react --save-dev
```

### Usage:

```javascript
import ReactDOM from 'react-dom'
import StringToReact from 'string-to-react'
let s = `<div>hi</div>`
ReactDOM.render(StringToReact(s), document.getElementById('container'))
```

### Customized Component

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import StringToReact from 'string-to-react'

class View extends React.Component {
  render() {
    return <div {...this.props}>{this.props.children}</div>
  }
}

let s = `<View style={{fontSize: '12px'}}>hi</View>`

let transform = function(tagName) {
  if (tagName === 'View') return View
  return null
}

ReactDOM.render(StringToReact(s, transform), document.getElementById('container'))
```

### Api

#### `function StringToReact(string, [transform])`

- `string`: The JSX string
- `transform`: `Function`
  - input: `tagName:string`
  - output: `FunctionComponent | ComponentClass | string | null`
  - typescript declare:
    ```typescript
    interface Transform {
      (tagName: string): FunctionComponent | ComponentClass | string | null
    }
    ```
  - example:
    ```javascript
    import View from './View.jsx'
    let transform = function(tagName) {
      if (tagName === 'pdiv') return 'div'
      else if (tagName === 'View') return View
      return null  // must return null if no match
    }
    ```