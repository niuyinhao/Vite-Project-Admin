import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
// import { HashRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import Router from '@/routers/index'
import { Provider } from 'react-redux'
import configStore from './store'
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  const { store, persistor } = configStore()
  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >

          <Router />
        </PersistGate>

      </Provider>
    </HashRouter>
  )
}

export default App
