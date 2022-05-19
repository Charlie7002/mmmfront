import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
	name: 'movie',
	initialState: {
		wishList: [
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
		moodFilter: '',
		moodGenre: '',
		publicFilter: false,
		whereFilter: false,
		displaySmiley: false,
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

		toggleSmiley: state => {
			state.displaySmiley = !state.displaySmiley;
		},

		addMoodFilter(state, action) {
			//plutot un toggle
			console.log(action.payload);
			const { name, genre } = action.payload;

			console.log('**************mood');
			console.log(name);
			console.log('**************genre');
			console.log(genre);

			state.moodFilter = name;
			state.moodGenre = genre;
		},
		removeMoodFilter(state) {
			state.moodFilter = '';
		},
		addPublicFilter(state) {
			state.publicFilter = !state.publicFilter;
		},

		addWhereFilter(state) {
			state.whereFilter = !state.whereFilter;
		},
	},
});

export const {
	addToWishlist,
	removeFromWishlist,
	toggleSmiley,
	addMoodFilter,
	addPublicFilter,
	addWhereFilter,
	removeMoodFilter,
} = movieSlice.actions;
export default movieSlice.reducer;
