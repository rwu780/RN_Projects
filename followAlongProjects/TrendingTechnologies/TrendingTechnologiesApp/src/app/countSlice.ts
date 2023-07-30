
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { registerUser } from "./auth/authActions";

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0
}

export const counterSlice= createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            console.log("adfasdfas")
            state.value += 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
            console.log(state.value)
        }
    },
    extraReducers(builder) {
        // builder.addCase(
        //     registerUser.pending, (state, action) => {
        //         console.log("A#@#$#@")
        //     }

        // )
    }
})

export const { increment, incrementByAmount} = counterSlice.actions
export const selectCount = (state: RootState) => state.rootReducer.counter.value

export default counterSlice.reducer;