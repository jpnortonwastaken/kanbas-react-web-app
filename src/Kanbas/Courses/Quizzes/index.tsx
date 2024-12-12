import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz, deleteQuiz, updateQuiz } from "./reducer"; // Add updateQuiz import
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical, IoCloseCircle } from "react-icons/io5"; // Add this import
import FacultyOnly from "../../Account/FacultyOnly";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as questionsClient from "./Questions/client";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { Link } from "react-router-dom";
import { formatDateTime } from "./utils";

export default function Quizzes() {
  const { cid } = useParams();
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );
  const isStudent = currentUser?.role === "STUDENT";

  const quizzes = useSelector(
    (state: any) =>
      state.quizzesReducer?.quizzes?.filter((quiz: any) => {
        const isCourseQuiz = quiz.courseId === cid;

        if (isStudent) {
          return isCourseQuiz && quiz.published;
        }

        return isCourseQuiz;
      }) || []
  );

  const dispatch = useDispatch();

  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const fetchQuizzes = async () => {
    const quizzes = await quizzesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuiz(quizzes));
  };

  const togglePublish = async (quiz: any) => {
    const updatedQuiz = {
      ...quiz,
      published: !quiz.published,
    };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const publishAll = async () => {
    const updatedQuizzes = await Promise.all(
      quizzes.map(async (quiz: any) => {
        if (!quiz.published) {
          const updatedQuiz = { ...quiz, published: true };
          await quizzesClient.updateQuiz(updatedQuiz);
          return updatedQuiz;
        }
        return quiz;
      })
    );
    dispatch(setQuiz(updatedQuizzes));
  };

  const unpublishAll = async () => {
    const updatedQuizzes = await Promise.all(
      quizzes.map(async (quiz: any) => {
        if (quiz.published) {
          const updatedQuiz = { ...quiz, published: false };
          await quizzesClient.updateQuiz(updatedQuiz);
          return updatedQuiz;
        }
        return quiz;
      })
    );
    dispatch(setQuiz(updatedQuizzes));
  };

  // Add state for question counts
  const [questionCounts, setQuestionCounts] = useState<{
    [key: string]: number;
  }>({});

  // Update fetchQuestionCounts function
  const fetchQuestionCounts = async () => {
    try {
      const counts = await Promise.all(
        quizzes.map(async (quiz: any) => {
          if (!quiz._id) {
            return { quizId: quiz._id, count: 0 };
          }
          try {
            const questions = await questionsClient.findQuestionsByQuiz(
              quiz._id
            );
            return { quizId: quiz._id, count: questions.length };
          } catch (error) {
            console.error(
              `Error fetching questions for quiz ${quiz._id}:`,
              error
            );
            return { quizId: quiz._id, count: 0 };
          }
        })
      );

      setQuestionCounts(
        counts.reduce(
          (acc, { quizId, count }) => ({
            ...acc,
            [quizId]: count,
          }),
          {}
        )
      );
    } catch (error) {
      console.error("Error fetching question counts:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  // Add useEffect to fetch counts when quizzes change
  useEffect(() => {
    if (quizzes.length > 0) {
      fetchQuestionCounts();
    }
  }, [quizzes]);

  return (
    <div className="wd-quizzes">
      <FacultyOnly>
        <QuizControls
          cid={cid || ""}
          publishAll={publishAll}
          unpublishAll={unpublishAll}
        />
      </FacultyOnly>
      <br />
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div
            className="wd-title p-3 ps-2 d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-2 fs-4" />
              QUIZZES
            </div>
            <IoEllipsisVertical className="fs-4" />
          </div>

          <ul className="wd-lessons list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li key={quiz._id} className="wd-lesson list-group-item p-3 ps-1">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <div>
                      <div className="fw-bold">
                        <Link
                          to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                          className="text-decoration-none text-dark"
                        >
                          {quiz.title}
                        </Link>
                        <FacultyOnly>
                          {quiz.published ? (
                            <GreenCheckmark
                              className="ms-2"
                              style={{ cursor: "pointer" }}
                              onClick={() => togglePublish(quiz)}
                            />
                          ) : (
                            <IoCloseCircle
                              className="ms-2 text-danger"
                              style={{ cursor: "pointer" }}
                              onClick={() => togglePublish(quiz)}
                            />
                          )}
                        </FacultyOnly>
                      </div>
                      <div className="text-muted">
                        <span className="text-danger">{quiz.type}</span> |
                        <b> Due</b> {formatDateTime(quiz.dueDate)} |
                        {quiz.points} pts |{questionCounts[quiz._id] || 0}{" "}
                        questions
                      </div>
                    </div>
                  </div>
                  <FacultyOnly>
                    <QuizControlButtons
                      quizId={quiz._id}
                      courseId={cid || ""}
                      quiz={quiz}
                      deleteQuiz={removeQuiz}
                      togglePublish={togglePublish}
                    />
                  </FacultyOnly>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
