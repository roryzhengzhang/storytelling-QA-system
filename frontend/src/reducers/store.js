import storybookReducer from '../modules/StoryBook/storybookSlice'
import configReducer from '../views/Configuration/configSlice'
import { configureStore } from '@reduxjs/toolkit'

import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    storybook: storybookReducer,
    config: configReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export default store;