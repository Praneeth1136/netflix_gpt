// ========== gptSlice.jsx ==========
import { createSlice } from '@reduxjs/toolkit'

const gptSlice = createSlice({
    name: 'gptResMovies',
    initialState: {
        gptResMovies: null,
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        addGptMovies: (state, action) => {
            state.gptResMovies = action.payload
            state.isLoading = false
        },
        removeGptMovies: (state) => {
            state.gptResMovies = null
            state.isLoading = false
        },
    },
})

export const { addGptMovies, removeGptMovies, setLoading } = gptSlice.actions

export default gptSlice.reducer
