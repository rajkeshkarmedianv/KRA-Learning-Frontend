import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        items: []
    },
    reducers: {
        addFavorite: (state, action) => {
            const exists = state.items.find(
                (m) => m.imdbID === action.payload.imdbID
            );
            if (!exists) state.items.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.items = state.items.filter(
                (m) => m.imdbID !== action.payload
            );
        },
    },
})

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer