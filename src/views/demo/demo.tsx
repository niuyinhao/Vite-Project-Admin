import { connect } from 'react-redux'
import { compose } from 'redux'
import { BorderBox12, Decoration1, ScrollRankingBoard } from '@jiaminghi/data-view-react'
import myApp from '../../store/action/myApp.js'
import './demo.css'
function Demo(props: any) {
  const config = {
    header: ['列1', '列2', '列3'],
    data: [
      {
        name: '周口',
        value: 55
      },
      {
        name: '南阳',
        value: 120
      },
      {
        name: '西峡',
        value: 78
      },
      {
        name: '驻马店',
        value: 66
      },
      {
        name: '新乡',
        value: 80
      },
      {
        name: '信阳',
        value: 45
      },
      {
        name: '漯河',
        value: 29
      }
    ]
  };
  const handel = () => {
    props.numUpdate({
      ...props.myApp,
      age: props.myApp.age + 1
    })
  }
  return (
    <div>
      <ScrollRankingBoard config={config} style={{ width: '100%', height: '300px' }} />

      <BorderBox12>handel
        <div className="xpanel">
          <div className="fill-h">我是小牛</div>
          <button onClick={handel}>点击改变props</button>
          <span>{props.myApp.age}</span>
        </div>
      </BorderBox12>
    </div>
  )
}

function propsMaping(store: any) {
  const { myApp } = store
  return {
    myApp
  }
}
function actionMaping(dispatch: Function) {
  return {
    upMyApp: compose(dispatch, myApp.updatemyApp),
    numUpdate: compose(dispatch, myApp.numUpdate)
  }
}
export default connect(propsMaping, actionMaping)(Demo);