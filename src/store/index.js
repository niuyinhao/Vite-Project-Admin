import { createStore, compose, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
const persistConfig = {
    key: 'myApp',
    storage: storage
};
const persist_reducers = persistReducer(persistConfig, reducers);
export default () => {
    let store = createStore(persist_reducers, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor }
}

