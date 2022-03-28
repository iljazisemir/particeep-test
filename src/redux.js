import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { movies$ } from "./movies";

const initialState = {
  loading: false,
  error: null,
  list: {},
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  try {
    let response = await movies$;
    response = JSON.stringify(response);
    response = JSON.parse(response);
    let data = await response;
    return data;
  } catch (error) {
    throw Error(error);
  }
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    likeMovie: (state, action) => {
      state.list.map((m) => (m.id === action.payload ? m.likes++ : null));
      return state;
    },
    unlikeMovie: (state, action) => {
      state.list.map((m) => (m.id === action.payload ? m.likes-- : null));
      return state;
    },
    dislikeMovie: (state, action) => {
      state.list.map((m) => (m.id === action.payload ? m.dislikes++ : null));
      return state;
    },
    undislikeMovie: (state, action) => {
      state.list.map((m) => (m.id === action.payload ? m.dislikes-- : null));
      return state;
    },
    deleteMovie: (state, action) => {
      state.list = state.list.filter((m) => m.id !== action.payload);
      return state;
    },
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getMovies.fulfilled]: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    [getMovies.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export const {
  likeMovie,
  dislikeMovie,
  unlikeMovie,
  undislikeMovie,
  deleteMovie,
} = movieSlice.actions;

export const store = configureStore({
  reducer: {
    movies: movieSlice.reducer,
  },
});
