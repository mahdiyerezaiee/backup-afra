import { loadingBarMiddleware } from 'react-redux-loading-bar';
import {applyMiddleware,compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {reducers} from '../reducers';
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig={
    key:'main-root',
    storage,
}

const persistedReducer=persistReducer(persistConfig,reducers);

export const store=createStore(
persistedReducer

,compose(applyMiddleware(thunk,loadingBarMiddleware())));


 const Persistor=persistStore(store);
 export {Persistor};