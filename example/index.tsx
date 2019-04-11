import ReactDOM from 'react-dom'
import parser, { Transform } from '../src/parser/parser'
import View from './View'
let s = `<View
        style={{
          padding: '10 20 40 20',
          flexDirection: 'column',
          width: 800,
          height: 800,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        test={123}
      >
        <View style={{flexDirection: 'column'}}>
          <View style={{ width: 660, justifyContent: 'space-between' }}>
            <span style={{ width: 165, height: 30, fontSize: 14 }}>佛山2号仓</span>
            <span style={{ width: 165, fontSize: 14 }}>1楼</span>
            <span style={{ width: 165, fontSize: 14 }}>11区</span>
            <span style={{ width: 165, fontSize: 14 }}>7件</span>
          </View>
          <View style={{ width: 660 }}>
            <span style={{ width: 170, fontSize: 14 }}>SS1903060011002</span>
          </View>
        </View>
      </View>`
let transform: Transform = function(tagName) {
  console.log(tagName)
  if (tagName === 'View') return View
  return null
}
let r = parser(s, transform)
console.log(r)
ReactDOM.render(r, document.getElementById('container'))
