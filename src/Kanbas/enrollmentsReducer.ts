import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: [] as Enrollment[],
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enroll: (state, { payload }) => {
      if (
        !state.enrollments.some(
          (e) => e.user === payload.user && e.course === payload.course
        )
      ) {
        state.enrollments = [...state.enrollments, payload];
      }
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, enroll, unenroll, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
