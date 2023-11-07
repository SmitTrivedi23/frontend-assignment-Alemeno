import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  try {
    const response = await fetch('https://mocki.io/v1/59263fcc-f004-4c03-9589-e397b77ebaba');
    const data = await response.json();
    return data.courses.flatMap((course) => course.students);
  } catch (error) {
    throw new Error('Failed to fetch students.');
  }
});

const studentSlice = createSlice({
  name: 'students',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
