import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setQuiz, deleteQuiz } from "./reducer";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import FacultyOnly from "../../Account/FacultyOnly";
import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const quizzes = useSelector(
    (state: any) =>
      state.quizzesReducer?.quizzes?.filter(
        (quiz: any) => quiz.courseId === cid
      ) || []
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

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  return (
    <div className="wd-quizzes">
      <FacultyOnly>
        <QuizControls cid={cid || ""} />
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
                      <div className="fw-bold">{quiz.title}</div>
                      <div className="text-muted">
                        <span className="text-danger">{quiz.type}</span> |
                        <b> Due</b>{" "}
                        {new Date(quiz.dueDate).toLocaleDateString()} |
                        {quiz.points} pts
                      </div>
                    </div>
                  </div>
                  <FacultyOnly>
                    <QuizControlButtons
                      quizId={quiz._id}
                      courseId={cid || ""}
                      deleteQuiz={removeQuiz}
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
