import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
	name: 'movie',
	initialState: {
		wishList: [
			//example
			// backdrop_path: '/4cWLRhub0yY9VJpdw0nqoTPYyiN.jpg',
			// genres: [[Object], [Object], [Object], [Object]],
			// id: 862,
			// runtime': 81,
			// title: 'Toy Story',
			// year: 1995,
		],
		blackList: [], //juste les ids
		moviesFetch: [],
		moviesNow: [],
		moviesPopular: [],
		moodFilter: '',
		moodGenre: '',
		publicFilter: false,
		whereFilter: false,
		displaySmiley: false,
	},
	reducers: {
		//ADD MOVIE TO WISHLIST
		addToWishlist: (state, { payload }) => {
			!state.wishList.includes(payload.id) && (state.wishList = [...state.wishList, payload]);
			console.log('-------------state.wishList');
			console.log(state.wishList);
		},
		//REMOVE ITEM FROM WISHLIST
		removeFromWishlist: (state, { payload }) => {
			state.wishList = state.wishList.filter(movie => movie.id !== payload);
		},

		toggleSmiley: state => {
			state.displaySmiley = !state.displaySmiley;
		},

		addMoodFilter(state, action) {
			//plutot un toggle
			const { name, genre } = action.payload;
			state.moodFilter = name;
			state.moodGenre = genre;
		},
		removeMoodFilter(state) {
			state.moodFilter = '';
		},
		addPublicFilter(state) {
			state.publicFilter = !state.publicFilter;
			state.publicFilter === true && (state.moodGenre = '10751');
			state.publicFilter === false && (state.moodGenre = '');
		},

		addWhereFilter(state) {
			state.whereFilter = !state.whereFilter;
		},
		addMovieFetch(state, { payload }) {
			state.moviesFetch = payload;
		},
		addMoviePopularFetch(state, { payload }) {
			state.moviesPopular = payload;
		},
		addToBlackList(state, { payload }) {
			!state.blackList.includes(payload) && (state.blackList = [...state.blackList, payload]);
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
	addMovieFetch,
	addMoviePopularFetch,
	addToBlackList,
} = movieSlice.actions;
export default movieSlice.reducer;
