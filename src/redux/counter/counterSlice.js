import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        update: (state, actions) => {
            // eslint-disable-next-line no-undef
            const c = Number(actions.payload);
            state.value += c;
        },
    },
});

export const { increment, decrement, update } = counterSlice.actions;
// export const selectState = (state) => state.counter;
export default counterSlice.reducer;