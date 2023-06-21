import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from '../features/comments/commetsSlice'


const store = configureStore({
    reducer: {
        comments: commentsReducer
    },
});

export default store;