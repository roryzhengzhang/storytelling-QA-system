import { TrendingUpOutlined } from '@material-ui/icons';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { fetchStoryFromServer, fetchQuestionFromServer } from '../../services/Client';
import { getStoryFromLibrary, getQuestionsFromLibrary, getSimilarQuestionsFromLibrary } from '../../services/Client';

const initialState = {
    storyName: "Three Bears in a Boat",
    story: getStoryFromLibrary("Three Bears in a Boat"),
    questions: getQuestionsFromLibrary("Three Bears in a Boat"),
    sim_questions: getSimilarQuestionsFromLibrary("Three Bears in a Boat"),
    rephrased_questions: null,
    selected_questions: [],
    cur_page_selected_questions: [],
    status: "idle",
    error: null,
    isConfig: true,
    // MODE 0: accomanied; MODE 1: indenpendent
    MODE: 1,
    serverReturned: false,
    currPage: 0,
    everPlayed: false,
    toggled: [],
    configSelected: {},
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
        setMode(state, action) {
            state.MODE = state.MODE === 0 ? 1 : 0;
            state.selected_questions = [];
            state.currPage = 0;
            if (state.MODE == 1) {
                state.isConfig = true
            }
        },
        setConfig(state, action) {
            state.isConfig = ! state.isConfig
        },
        setServerReturned (state, action) {
            state.serverReturned = action.payload.isFinished
        },
        resetPage(state, action) {
            state.currPage = 0;
        },
        toggleQuestionSelection(state, action) {
            const selected_question = action.payload.question;

            const index = state.cur_page_selected_questions.indexOf(selected_question);

            if (index > -1) {
                state.cur_page_selected_questions.splice(index, 1);
            }
            else {
                state.cur_page_selected_questions.push(selected_question);
            }
        },
        setQuestion(state, action) {
            const currPage = action.payload.currPage;
            const q_index = action.payload.q_index;
            const new_question_name = action.payload.question_name;

            
            const question_copy = copyQuestions(current(state.questions))
            console.log("q_index", q_index)
            console.log("particular question", question_copy[currPage])
            question_copy[currPage].qa_pair_list[q_index].question = new_question_name

            return {
                ...state,
                questions: question_copy
            }
        },
        setAnswer(state, action) {
            const currPage = action.payload.currPage;
            const q_index = action.payload.q_index;
            const answer = action.payload.answer;

            
            const question_copy = copyQuestions(current(state.questions))
            console.log("q_index", q_index)
            console.log("particular question", question_copy[currPage])
            question_copy[currPage].qa_pair_list[q_index].answer = answer

            return {
                ...state,
                questions: question_copy
            }
        },
        setConfigSelected(state, action) {
            const currPage = action.payload.currPage;
            const q_index = action.payload.q_index;
            console.log("setConfigSelected", state.configSelected)
            state.configSelected[currPage][q_index] = !state.configSelected[currPage][q_index]
        },
        nextPageWhenConfig(state, action) {
            // if (state.currPage < state.selected_questions.length) {
            //     state.selected_questions[state.currPage] = state.cur_page_selected_questions
            // } else {
            //     state.selected_questions.push(state.cur_page_selected_questions)
            // }

            // state.cur_page_selected_questions = []

            if (state.story)
                state.currPage = state.currPage === (state.story.length - 1) ? state.currPage : state.currPage + 1;
            // Add new page to configSelected
            if (state.currPage == state.configSelected.length) {
                state.configSelected.push(new Array(state.questions[state.currPage].qa_pair_list.length).fill(false))
            }

        },
        setEverPlayed(state, action) {
            state.everPlayed = true;
        },
        nextPage(state, action) {
            console.log("length of question: ", state.questions.length);
            console.log("Number of story section: ", state.story.content.length);
            state.everPlayed = false;
            if (state.story)
                state.currPage = state.currPage === (state.story.length - 1) ? state.currPage : state.currPage + 1;
            if (state.MODE === 0) {
                state.toggled = new Array(state.questions[state.currPage].qa_pair_list.length).fill(false);
            }


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
            state.storyName = action.payload;
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
            state.isConfig = true;
            state.configSelected = [[]];
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

        editQuestion(state, action) {

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

function copyQuestions(questions) {
    var copy_questions = []
    const tmp_q = [...questions]

    tmp_q.forEach( row => {
        var section = {}
        section.text = row.text
        section.qa_pair_list = []
        row.qa_pair_list.forEach( q => {
           var new_q = {
               answer: q.answer,
               question: q.question,
               start_idx: q.start_idx,
               end_idx: q.end_idx,
               back_eval_a: q.back_eval_a,
               score: q.score,
               category: q.category,
               answer_in_text: q.answer_in_text
            }
            section.qa_pair_list.push(new_q)
        } )
        copy_questions.push(section)
    } )

    return copy_questions
}

export function findFollowUpQuestions(currPage, question, storyName = "Three Bears in a Boat") {
    const simQuestions = getSimilarQuestionsFromLibrary(storyName)
    console.log("simQuestions[currPage]", simQuestions[currPage])
    const matched_question = simQuestions[currPage].find(o => o['question'] == question)
    if (matched_question !== undefined) {
        const follow_ups = matched_question.follow_ups
        return follow_ups
    } else {
        return []
    }
}

export function getSectionQuestionSetSize(currPage, storyName = "Three Bears in a Boat") {
    const questions = getQuestionsFromLibrary(storyName)
    if (currPage < questions.length) {
        return questions[currPage].qa_pair_list.length
    } else {
        return -1
    }

}

export function findQuestionIndexByName(currPage, q_name, storyName = "Three Bears in a Boat") {
    const questions = getQuestionsFromLibrary(storyName)
    const index = questions[currPage].qa_pair_list.findIndex(o => o['question'] === q_name)

    console.log("question index", index)
    return index
}


export const { setEverPlayed, setConfig, setQuestion, setServerReturned, setAnswer, nextPageWhenConfig, setConfigSelected, toggleQuestionSelection, setMode, getStories, nextPage, prevPage, resetPage, selectStory, toggleQuestion, evalQuestion, selectQuestion, getFollowupQuestion, getRephrasedQuestion, setInput, editQuestion } = storybookSlice.actions;

export default storybookSlice.reducer;