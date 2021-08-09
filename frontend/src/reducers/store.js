import storybookReducer from '../modules/StoryBook/storybookSlice'
import configReducer from '../modules/Configuration/configSlice'
import { configureStore } from '@reduxjs/toolkit'


export default configureStore({
    reducer: {
        storybook: storybookReducer,
        config: configReducer
    }
})