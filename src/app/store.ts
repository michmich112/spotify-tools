import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
/* eslint-disable-line */
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const loggerMiddleware = createLogger();

const persitstConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(
  persitstConfig,
  rootReducer
);


export const store = createStore(
  persistedReducer,
  applyMiddleware(
    loggerMiddleware
  )
)

export const persistor = persistStore(store);

export default store
