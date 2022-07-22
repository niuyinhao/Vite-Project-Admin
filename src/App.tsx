import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Demo from './views/demo/demo'
import { Provider } from 'react-redux'
import configStore from './store'
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  const { store, persistor } = configStore()
  return (
    <Provider store={store}>
      <PersistGate loading={null}
        persistor={persistor}
      >
        <Demo />
      </PersistGate>
    </Provider>
  )
}

export default App
