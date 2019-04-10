import { Attribute, OpenTag } from '../type'

interface Props {
  [key: string]: string | number | Props
}

const generateProps = function(tag: OpenTag): Props {
  if (tag.attributes.length < 1) return {}
  let result: Props = {}
  tag.attributes.forEach(attr => {
    let attrType = attr.value.type
    let props
    if (attrType === 'JSXExpressionContainer') {
      props = generateFromExpression(attr)
    } else if (attrType === 'Literal') {
      props = generateFromLiteral(attr)
    }
    result = { ...result, ...props }
  })
  return result
}

const generateFromExpression = function(attr: Attribute): Props {
  let result: Props = {}
  let name = attr.name.name
  let exp = attr.value.expression
  if (exp.type === 'ObjectExpression') {
    result[name] = exp.properties.reduce(
      (a, b) => {
        return { ...a, [b.key.name]: b.value.value }
      },
      { a: 1 }
    )
  } else if (exp.type === 'Literal') {
    result[name] = exp.value
  }
  return result
}

const generateFromLiteral = function(attr: Attribute): Props {
  let result: Props = {}
  let name = attr.name.name
  result[name] = attr.value.value
  return result
}

export default {
  generateProps
}
