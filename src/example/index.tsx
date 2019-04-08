import acorn = require('acorn')
import jsx = require('acorn-jsx')
import React from 'react'
import ReactDOM from 'react-dom'
let s = `<div style={{padding: 20, color: 'red'}}>
  <div a="123">123</div>
  <div></div>
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
      }
    } else if (attr.value.type === 'Literal') {
    }
  })
}

const buildElement = function(expression: ASTNode) {
  if (expression.type === 'JSXElement') {
    console.log(expression.openingElement.name.name)
    console.log(buildAttr(expression.openingElement))
  } else if (expression.type === 'JSXText') {
    console.log(expression.openingElement.name.name)
  }
}

buildElement(expression)

ReactDOM.render(<div>123</div>, document.getElementById('container'))
