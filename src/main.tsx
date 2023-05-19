import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { persistor, store } from './redux'
// console.log(store.getState());

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>


  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>

  </Provider>
  // </React.StrictMode>


)
