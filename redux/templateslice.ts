import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TemplateState {
    title: string;
    desc: string;
    questions: Array<{
        title: string;
        type: string;
        choices?: string[] | undefined;
    }>;
    activeQuestionIndex: number | null;
}

const initialState: TemplateState = {
    title: 'Untitled form',
    desc: 'From description',
    questions: [],
    activeQuestionIndex: null,
};

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setDesc(state, action: PayloadAction<string>) {
            state.desc = action.payload;
        },
        addQuestion(state) {
            const newQuestion = {
                title: '',
                type: 'SHORT_TEXT',
            };

            return {
                ...state,
                questions: [...state.questions, newQuestion],
                activeQuestionIndex: state.questions.length,
            };
        },
        updateQuestionTitle(state, action: PayloadAction<{ index: number; title: string }>) {
            const { index, title } = action.payload;
            state.questions[index].title = title;
        },
        updateQuestionType(state, action: PayloadAction<{ index: number; type: string }>) {
            const { index, type } = action.payload;
            state.questions[index].type = type;
        },
        updateQuestionValue(
            state,
            action: PayloadAction<{ index: number | null; value: string[] }>,
        ) {
            const { index, value } = action.payload;
            if (index !== null) {
                state.questions[index].choices = value;
            }
        },
        deleteQuestion(state, action: PayloadAction<number>) {
            const index = action.payload;
            state.questions.splice(index, 1);
            if (state.activeQuestionIndex !== null) {
                state.activeQuestionIndex = index === state.questions.length ? index - 1 : null;
            }
        },
        setActiveQuestionIndex(state, action: PayloadAction<number | null>) {
            state.activeQuestionIndex = action.payload;
        },
    },
});

export const {
    setTitle,
    setDesc,
    addQuestion,
    updateQuestionTitle,
    updateQuestionType,
    updateQuestionValue,
    deleteQuestion,
    setActiveQuestionIndex,
} = templateSlice.actions;

export default templateSlice.reducer;
