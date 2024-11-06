import { createSlice } from "@reduxjs/toolkit";
import * as db from "./Database";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

const initialState = {
  enrollments: db.enrollments as Enrollment[],
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enroll: (
      state,
      { payload }: { payload: { userId: string; courseId: string } }
    ) => {
      state.enrollments.push({
        _id: new Date().getTime().toString(),
        user: payload.userId,
        course: payload.courseId,
      });
    },
    unenroll: (
      state,
      { payload }: { payload: { userId: string; courseId: string } }
    ) => {
      state.enrollments = state.enrollments.filter(
        (e: Enrollment) =>
          !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, enroll, unenroll } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
