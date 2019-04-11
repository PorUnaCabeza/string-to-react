import parser from '../src/index'
import ReactDOMServer from 'react-dom/server'
import { Transform } from '../src/parser/parser'
import View from '../example/View'
describe('string-to-react[Base]', () => {
  let transform: Transform = function(tagName) {
    if (tagName === 'View') return View
    return null
  }
  test('test pure html', () => {
    let s = `<div>WE CHOOSE GO TO THE MOON</div>`
    let reactElement = parser(s)
    let reactString = ReactDOMServer.renderToStaticMarkup(reactElement)
    expect(reactString).toBe(s)
  })

  test('test nested element', () => {
    let s = `<div><span>we choose to go to the moon in this decade</span></div>`
    let reactElement = parser(s)
    let reactString = ReactDOMServer.renderToStaticMarkup(reactElement)
    expect(reactString).toBe(s)
  })

  test('test simple props', () => {
    let s = `<div a="false"><span b="t">not because they are easy</span></div>`
    let reactElement = parser(s)
    let reactString = ReactDOMServer.renderToStaticMarkup(reactElement)
    expect(reactString).toBe(s)
  })

  test('test className props', () => {
    let s = `<div className="t1"><span className="t"> but because they are hard</span></div>`
    let answer = s.replace(/className/g, 'class')
    let reactElement = parser(s)
    let reactString = ReactDOMServer.renderToStaticMarkup(reactElement)
    expect(reactString).toBe(answer)
  })

  test('test style props', () => {
    let s = `<div style={{color: 'red'}}></div>`
    let answer = `<div style="color:red"></div>`
    let reactElement = parser(s)
    let reactString = ReactDOMServer.renderToStaticMarkup(reactElement)
    expect(reactString).toBe(answer)
  })

  test('test customized component by transform', () => {
    let s = `<View className={'amd-yes'} style={{color: '#0f0'}}><span className="t">123</span></View>`
    let answer = `<div class="amd-yes" style="color:#0f0"><span class="t">123</span></div>`
    let reactElement = parser(s, transform)
    let reactString = ReactDOMServer.renderToStaticMarkup(reactElement)
    expect(reactString).toBe(answer)
  })
})
