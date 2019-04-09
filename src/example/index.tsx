import ReactDOM from 'react-dom'
import parser from '../parser'
let s = `<View
        style={{
          padding: '10 20 40 20',
          flexDirection: 'column',
          width: 800,
          height: 800,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View style={{flexDirection: 'column'}}>
          <View style={{ width: 660, justifyContent: 'space-between' }}>
            <Text style={{ width: 165, height: 30, fontSize: 14 }}>佛山2号仓</Text>
            <Text style={{ width: 165, fontSize: 14 }}>1楼</Text>
            <Text style={{ width: 165, fontSize: 14 }}>11区</Text>
            <Text style={{ width: 165, fontSize: 14 }}>7件</Text>
          </View>
          <View style={{ width: 660 }}>
            <Text style={{ width: 170, fontSize: 14 }}>SS1903060011002</Text>
            <BarCode moduleHeight={50} moduleWidth={2} content={'123456781234'} />
          </View>
        </View>
      </View>`
let r = parser(s)
console.log(r)
ReactDOM.render(r, document.getElementById('container'))
