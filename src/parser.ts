import { ComponentClass, FunctionComponent, ReactElement } from 'react'
import React from 'react'
import acorn = require('acorn')
import jsx = require('acorn-jsx')
import idWorker from './utils/idWorker'
import attr from './attr/attr'
import { ASTNode } from './type'

const acornParser = acorn.Parser.extend(jsx())

type ElementType = FunctionComponent | ComponentClass | string | null
export interface Transform {
  (tagName: string): ElementType
}

const buildElement = function(nodeList: ASTNode[], transform?: Transform): ReactElement[] {
  let result = []
  for (let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i]
    if (node.type === 'JSXElement') {
      let type: ElementType = node.openingElement.name.name
      if (transform) {
        let transformedType = transform(type)
        if (!!transformedType) {
          type = transformedType
        }
      }
      let ele = React.createElement(
        type,
        { key: idWorker.next(), ...attr.generateProps(node.openingElement) },
        buildElement(node.children || [], transform)
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

export default function(s: string, transform?: Transform) {
  let astTree = acornParser.parse(s) as any
  let expression = astTree.body[0].expression as ASTNode
  return buildElement([expression], transform)
}
