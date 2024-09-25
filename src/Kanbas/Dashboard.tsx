import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/1111/Home">
                        <img src="images/Course_Image_8.png" width={200} />
                        <div>
                            <h5>
                                CS1111
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/2222/Home">
                        <img src="images/Course_Image_2.png" width={200} />
                        <div>
                            <h5>
                                CS2222
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Calculus 1
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/3333/Home">
                        <img src="images/Course_Image_3.png" width={200} />
                        <div>
                            <h5>
                                CS3333
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Calculus 2
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/4444/Home">
                        <img src="images/Course_Image_4.png" width={200} />
                        <div>
                            <h5>
                                CS4444
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Computer Systems
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/5555/Home">
                        <img src="images/Course_Image_5.png" width={200} />
                        <div>
                            <h5>
                                CS5555
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Game Programming
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/6666/Home">
                        <img src="images/Course_Image_6.png" width={200} />
                        <div>
                            <h5>
                                CS6666
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Algorithms
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link className="wd-dashboard-course-link"
                        to="/Kanbas/Courses/7777/Home">
                        <img src="images/Course_Image_7.png" width={200} />
                        <div>
                            <h5>
                                CS7777
                            </h5>
                            <p className="wd-dashboard-course-title">
                                Dynamic Earth
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
