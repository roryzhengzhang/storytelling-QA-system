import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchStoryFromServer, fetchQuestionFromServer } from '../../services/Client';
import { getStoryFromLibrary, getQuestionsFromLibrary, getSimilarQuestionsFromLibrary } from '../../services/Client';

const initialState = {
    story: getStoryFromLibrary("Three Bears in a Boat"),
    questions: getQuestionsFromLibrary("Three Bears in a Boat"),
    sim_questions: getSimilarQuestionsFromLibrary("Three Bears in a Boat"),
    rephrased_questions: null,
    status: "idle",
    error: null,
    currPage: 0,
    toggled: [],
    selected: "",
    evaluation: [],
    userInput: []
}

// export const fetchStory = createAsyncThunk('storybook/fetchStory', async (storyInfo) => {
//     const story = await fetchStoryFromServer(storyInfo);
//     const questions = await fetchQuestionFromServer(storyInfo);
//     return {story: story, questions: questions};
// })


const storybookSlice = createSlice({
    name: 'storybook',
    initialState,
    reducers: {
        resetPage(state, action) {
            state.currPage = 0;
        },
        nextPage(state, action) {
            console.log("next page:");
            if (state.questions)
                state.currPage = state.currPage === (state.questions.size - 1) ? state.currPage : state.currPage + 1;
            state.toggled = new Array(state.questions[0].qa_pair_list.length).fill(false);
        },

        prevPage(state, action) {
            state.currPage = state.currPage === 0 ? state.currPage : state.currPage - 1;
            console.log("prev page:", state.currPage)
        },

        selectStory(state, action) {
            console.log("story selected");
            const story = getStoryFromLibrary(action.payload);
            const questions = getQuestionsFromLibrary(action.payload);
            const sim_questions = getSimilarQuestionsFromLibrary(action.payload);
            state.evaluation = []
            state.userInput = []
            state.toggled = []
            if (questions)
                questions.map((question_group) => {
                    state.evaluation.push(new Array(question_group.qa_pair_list.length).fill([-1, -1, -1]));
                    state.userInput.push(new Array(question_group.qa_pair_list.length).fill(['', '', '']));
                })
            console.log(state.evaluation)
            state.story = story;
            state.questions = questions;
            state.sim_questions = sim_questions;
            state.currPage = 0;
        },

        toggleQuestion(state, action) {
            if (state.toggled.indexOf(action.payload) !== -1) {
                state.toggled = state.toggled.filter((item) => (item !== action.payload));
            }
            else
                state.toggled.push(action.payload);
        },

        evalQuestion(state, action) {
            var eval_list = state.evaluation[state.currPage]
            // if (!eval_list)
            //     eval_list = new Array(state.questions[0].qa_pair_list.length).fill(-1).map(() => new Array(3).fill(-1));
            eval_list[action.payload.key][action.payload.type] = action.payload.status;
            state.evaluation[state.currPage] = eval_list;
        },

        selectQuestion(state, action) {
            console.log(action.payload)
            state.selected = action.payload;
        },

        setInput(state, action) {
            console.log(action.payload.key, action.payload.type);
            state.userInput[state.currPage][action.payload.key][action.payload.type] = action.payload.value;
        },

        getFollowupQuestion(state, action) {

        },

        getRephrasedQuestion(state, action) {

        }


    },
    extraReducers: {
        // [fetchStory.pending]: (state, action) => {
        //     state.status = 'loading';
        // },
        // [fetchStory.fulfilled]: (state, action) => {
        //     state.status = 'succeeded';
        //     state.story = action.payload.story;
        // }
    }
})


export const { getStories, nextPage, prevPage, resetPage, selectStory, toggleQuestion, evalQuestion, selectQuestion, getFollowupQuestion, getRephrasedQuestion, setInput } = storybookSlice.actions;

export default storybookSlice.reducer;