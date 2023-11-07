import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  try {
    const response = await fetch('https://mocki.io/v1/59263fcc-f004-4c03-9589-e397b77ebaba');
    const data = await response.json();
    return data.courses;
  } catch (error) {
    throw new Error('Failed to fetch courses.');
  }
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    markCourseAsCompleted: (state, action) => {
      const courseId = action.payload;
      const course = state.data.find((c) => c.id === courseId);
      if (course) {
        course.completed = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { markCourseAsCompleted } = courseSlice.actions;

export default courseSlice.reducer;
