import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCategories = createAsyncThunk(
  'jokes/fetchCategories',
  async () => {
    const res = await fetch('https://api.chucknorris.io/jokes/categories');
    return res.json();
  }
);


export const fetchJoke = createAsyncThunk(
  'jokes/fetchJoke',
  async (category, { getState, rejectWithValue }) => {
    const { categories } = getState().jokes;
    if (category && !categories.includes(category.toLowerCase())) {
      return rejectWithValue('invalid-category');
    }
    let url = 'https://api.chucknorris.io/jokes/random';
    if (category) url += `?category=${category}`;
    const res = await fetch(url);
    return res.json();
  }
);

const jokesSlice = createSlice({
  name: 'jokes',
  initialState: {
    categories: [],
    joke: '',
    loading: false,
    error: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchJoke.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.joke = '';
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.loading = false;
        state.joke = action.payload.value;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.loading = false;
        if (action.payload === 'invalid-category') {
          state.error = 'No category found';
        } else {
          state.error = 'Error fetching joke';
        }
      });
  }
});

export default jokesSlice.reducer;
