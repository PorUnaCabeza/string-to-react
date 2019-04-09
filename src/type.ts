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
