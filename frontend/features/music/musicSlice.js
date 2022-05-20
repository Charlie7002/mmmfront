import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const musicSlice = createSlice({
  name: "music",
  initialState: {
    moodFilter: "",
    moodList: [],
    moodPlaylist: [],
    ambianceFilter: false,
    genreFilter: false,
    displaySmiley: false,
  },
  reducers: {
    toggleSmiley: (state) => {
      state.displaySmiley = !state.displaySmiley;
    },
    //Search by mood
    addMoodFilter(state, { payload }) {
      state.moodFilter = payload;
    },

    addMoodList(state, { payload }) {
      state.moodList = payload;
    },

    addMoodPlay(state, { payload }) {
      state.moodPlaylist = payload;
    },

    removeMoodLists(state) {
      state.moodList = [];
      state.moodPlaylist = [];
    },
    removeMoodFilter(state) {
      state.moodFilter = "";
    },
    //Search by ambiance
    addAmbianceFilter(state) {
      state.ambianceFilter = !state.ambianceFilter;
    },
    //Search by genre
    addGenreFilter(state) {
      state.genreFilter = !state.genreFilter;
    },
  },
});

export const {
  toggleSmiley,
  addMoodFilter,
  addMoodList,
  addMoodPlay,
  removeMoodLists,
  addAmbianceFilter,
  addGenreFilter,
  removeMoodFilter,
} = musicSlice.actions;

export default musicSlice.reducer;
