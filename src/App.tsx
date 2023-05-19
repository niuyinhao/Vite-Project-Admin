import { useState } from 'react'
import logo from './logo.svg'
import { ConfigProvider, theme } from 'antd';
import { connect } from 'react-redux'
// import { HashRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import Router from '@/routers/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'antd/dist/reset.css';
import './App.less';
import useThem from './hooks/useThem';
function App(props: any) {
  // const { store, persistor } = configStore()
  // console.log(props);

  const { themeConfig } = props

  useThem(themeConfig)

  return (
    <HashRouter>

      <ConfigProvider >
        <Router />
      </ConfigProvider>
    </HashRouter>

  )
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
