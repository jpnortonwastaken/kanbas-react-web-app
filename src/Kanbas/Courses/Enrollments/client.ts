import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchEnrollmentsForUser = async (userId: string) => {
  const response = await axios.get(
    `${REMOTE_SERVER}/api/users/${userId}/enrollments`
  );
  return response.data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  try {
    const response = await axios.post(ENROLLMENTS_API, {
      userId,
      courseId,
    });
    if (!response.data._id) {
      throw new Error("Invalid enrollment response");
    }
    return response.data;
  } catch (error) {
    console.error("Enrollment failed:", error);
    throw error;
  }
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  try {
    await axios.delete(ENROLLMENTS_API, { data: { userId, courseId } });
  } catch (error) {
    console.error("Unenroll API error:", error);
    throw error;
  }
};

export const findAllCourses = async () => {
  const response = await axios.get(`${REMOTE_SERVER}/api/courses`);
  return response.data;
};
