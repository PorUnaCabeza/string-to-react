import { ReactElement } from 'react'
import React from 'react'
import acorn = require('acorn')
import jsx = require('acorn-jsx')
import IdWorker from './utils/IdWorker'
import { ASTNode, OpenTag } from './type'

const acornParser = acorn.Parser.extend(jsx())

const buildAttr = function(tag: OpenTag) {
  if (tag.attributes.length < 1) return null
  let result = {} as any
  tag.attributes.forEach(attr => {
    let name = attr.name.name
    if (attr.value.type === 'JSXExpressionContainer') {
      let exp = attr.value.expression
      if (exp.type === 'ObjectExpression') {
        result[name] = exp.properties.reduce((a, b) => {
          return Object.assign(a, { [b.key.name]: b.value.value })
        }, {})
      } else if (exp.type === 'Literal') {
        result[name] = exp.value
      }
    } else if (attr.value.type === 'Literal') {
      result[name] = attr.value.value
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
        Object.assign({ key: IdWorker.next() }, buildAttr(node.openingElement)),
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

export default function(s: string) {
  let astTree = acornParser.parse(s) as any
  let expression = astTree.body[0].expression as ASTNode
  return buildElement([expression])
}
