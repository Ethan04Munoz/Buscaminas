import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './combineReducers'; //Importamos los reducers combinadoss

const store = configureStore({
  reducer: rootReducer,
});

export default store;
