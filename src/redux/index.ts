import { combineReducers, Store, compose, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import global from './modules/global/reducer';
import menu from './modules/menu/reducer';
import breadcrumb from './modules/breadcrumb/reducer';
import tabs from './modules/tabs/reducer';
const reduxcer = combineReducers({
    global,
    breadcrumb,
    menu,
    tabs
});

//redux 持久化配置
const persistConfig = {
    key: "redux-state",
    storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reduxcer);

//开启 redux-dectools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
