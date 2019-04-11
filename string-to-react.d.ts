import { ComponentClass, FunctionComponent, ReactElement } from 'react'

declare namespace StringToReact {
  interface Transform {
    (tagName: string): FunctionComponent | ComponentClass | string | null
  }
  interface parser {
    (s: string, transform: Transform): ReactElement
  }
}
export = StringToReact
