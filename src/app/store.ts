import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice';
import authReducer from '../components/auth/authenticationSlice';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { applyMiddleware, createStore } from 'redux';
/* eslint-disable-line */
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const loggerMiddleware = createLogger();

export const oldstore = configureStore({
  reducer: {
    //    counter: counterReducer,
    authentication: authReducer,
  },
  //middleware: [
  //  loggerMiddleware
  //]
});


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

//export type AppDispatch = typeof store.dispatch;
//export type RootState = ReturnType<typeof store.getState>;
//export type AppThunk<ReturnType = void> = ThunkAction<
//  ReturnType,
//  RootState,
//  unknown,
//  Action<string>
//>;


export default store
