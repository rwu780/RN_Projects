import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from './countSlice'
import authReducer from '../app/auth/loginSlice'

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
})

const store = configureStore({
    reducer: {
        rootReducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;