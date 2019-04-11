import { ComponentClass, FunctionComponent, ReactElement } from 'react'
import React from 'react'
import acorn = require('acorn')
import jsx = require('acorn-jsx')
import idWorker from '../utils/idWorker'
import attr from '../attr/attr'

const acornParser = acorn.Parser.extend(jsx())

type ElementType = FunctionComponent | ComponentClass | string | null
export interface ASTNode {
  start: number
  end: number
  type: string
  children?: ASTNode[]
  value?: string
  openingElement: OpenTag
  closingElement: any
}
export interface OpenTag {
  start: number
  end: number
  type: string
  attributes: Attribute[]
  selfClosing: boolean
  name: {
    name: string
  }
}
export interface Attribute {
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

export interface AttrExpProp {
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
        type = transformedType ? transformedType : type
      }
      let ele = React.createElement(
        type,
        { key: idWorker.next(), ...attr.generateProps(node.openingElement) },
        buildElement(node.children || [], transform)
      )
      result.push(ele)
    } else if (node.type === 'JSXText') {
      if (node.value && node.value.replace(/(\s|\n)/g, '').length === 0) continue
      result.push(node.value)
    }
  }
  return result as ReactElement[]
}

export default function(s: string, transform?: Transform): ReactElement {
  let astTree = acornParser.parse(s) as any
  console.log(astTree)
  let expression = astTree.body[0].expression as ASTNode
  return buildElement([expression], transform)[0]
}
