import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
// import { HashRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import Router from '@/routers/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'antd/dist/reset.css';
import './App.css';
function App() {
  // const { store, persistor } = configStore()
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  )
}

export default App
