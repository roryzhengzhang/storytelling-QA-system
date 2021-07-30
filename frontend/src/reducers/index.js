import { combineReducers } from 'redux'
import { storyReducer } from './storyReducer'


const rootReducer = combineReducers({
    story: storyReducer
})

export default rootReducer;