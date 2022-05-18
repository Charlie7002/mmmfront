import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
	name: 'movie',
	initialState: {
		movies: [
			{
				title: 'Le renard fou',
				length: '2h10',
				year: '2020',
			},
			{
				title: 'Le renard fou',
				length: '2h10',
				year: '2020',
			},
		],
		selectedFilters: [],
	},
	reducers: {
		//ADD MOVIE TO WISHLIST
		addToWishlist: (state, action) => {
			state.movies.push(action.payload);
		},
		//REMOVE ITEM FROM WISHLIST
		removeFromWishlist: (state, action) => {
			state.movies = state.movies.filter(movie => movie._id !== action.payload._id);
		},
		toggleSelectedFilter: (state, { payload }) => {
			if (!state.selectedFilters.includes(payload)) {
				state.selectedFilters = [...state.selectedFilters, payload];
			} else {
				state.selectedFilters = state.selectedFilters.filter(filter => filter !== payload);
			}
		},
	},
});

export const { addToWishlist, removeFromWishlist, toggleSelectedFilter } = movieSlice.actions;
export default movieSlice.reducer;
