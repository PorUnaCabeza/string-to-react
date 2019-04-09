import acorn = require('acorn')
import jsx = require('acorn-jsx')
import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
let s = `<div style={{padding: 20, color: 'red'}}>
  <div a="123">123</div>
  <div b={1}></div>
</div>`
interface ASTNode {
  start: number
  end: number
  type: string
  children?: ASTNode[]
  value?: string
  openingElement: OpenTag
  closingElement: any
}
interface OpenTag {
  start: number
  end: number
  type: string
  attributes: Attribute[]
  selfClosing: boolean
  name: {
    name: string
  }
}
interface Attribute {
  start: number
  end: number
  type: string
  name: {
    start: number
    end: number
    name: string
    type: string
  }
  value: {
    start: number
    end: number
    type: string
    expression: {
      properties: AttrExpProp[]
      type: string
      value: string | number
    }
    value: string | number
  }
}

interface AttrExpProp {
  key: {
    start: number
    end: number
    name: string
    type: string
  }
  value: {
    start: number
    end: number
    raw: string
    type: string
    value: string | number
  }
}
const uuid = function(): string {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}
let a = acorn.Parser.extend(jsx()).parse(s) as any
let expression = a.body[0].expression as ASTNode
console.log(expression)

const buildAttr = function(tag: OpenTag) {
  if (tag.attributes.length < 1) return null
  let result = {} as any
  tag.attributes.forEach(attr => {
    if (attr.value.type === 'JSXExpressionContainer') {
      let exp = attr.value.expression
      if (exp.type === 'ObjectExpression') {
        result[attr.name.name] = exp.properties.reduce((a, b) => {
          return Object.assign(a, { [b.key.name]: b.value.value })
        }, {})
      } else if (exp.type === 'Literal') {
        result[attr.name.name] = exp.value
      }
    } else if (attr.value.type === 'Literal') {
      result[attr.name.name] = attr.value.value
    }
  })
  return result
}

const buildElement = function(nodeList: ASTNode[]): ReactElement[] {
  let result = []
  for (let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i]
    if (node.type === 'JSXElement') {
      let ele = React.createElement(
        node.openingElement.name.name,
        Object.assign({ key: uuid() }, buildAttr(node.openingElement)),
        buildElement(node.children || [])
      )
      result.push(ele)
    } else if (node.type === 'JSXText') {
      if (!node.value) continue
      if (node.value.replace(/(\s|\n)/g, '').length === 0) continue
      result.push(node.value)
    }
  }
  return result as ReactElement[]
}

let r = buildElement([expression])

ReactDOM.render(r, document.getElementById('container'))
