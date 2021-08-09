import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    categories: {
        character: true,
        place: true,
        feeling: true,
        action: true,
        causal: true,
        outcome: true,
        prediction: true
    }
}

// export const fetchStory = createAsyncThunk('storybook/fetchStory', async (storyInfo) => {
//     const story = await fetchStoryFromServer(storyInfo);
//     const questions = await fetchQuestionFromServer(storyInfo);
//     return {story: story, questions: questions};
// })


const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        toggleCategory(state, action) {
            state.categories[action.payload] = !state.categories[action.payload];
        }

    },
    extraReducers: {
    }
})


export const { toggleCategory } = configSlice.actions;

export default configSlice.reducer;