export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label"><b>Assignment Name</b></label>
                <input id="wd-name" className="form-control" defaultValue="A1" />
            </div>

            <div className="mb-3">
                <textarea 
                    id="wd-description" 
                    className="form-control" 
                    rows={6}
                    defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
                />
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-3 text-end">
                    <label htmlFor="wd-points" className="form-label">Points</label>
                </div>
                <div className="col-md-9">
                    <input id="wd-points" className="form-control" defaultValue={100} />
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-3 text-end">
                    <label htmlFor="wd-group" className="form-label">Assignment Group</label>
                </div>
                <div className="col-md-9">
                    <select id="wd-group" className="form-select">
                        <option value="Assignments">Assignments</option>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Labs">Labs</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3 align-items-center">
                <div className="col-md-3 text-end">
                    <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
                </div>
                <div className="col-md-9">
                    <select id="wd-display-grade-as" className="form-select">
                        <option value="percentage">Percentage</option>
                        <option value="points">Points</option>
                    </select>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3 text-end">
                    <label htmlFor="wd-submission-type-box" className="form-label">Submission Type</label>
                </div>
                <div className="col-md-9">
                    <div id="wd-submission-type-box" className="p-3" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                        <div className="mb-3">
                            <select id="wd-submission-type" className="form-select">
                                <option value="online">Online</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Online Entry Options</label><br />
                            <label htmlFor="wd-text-entry" className="form-check-label">
                                <input type="checkbox" id="wd-text-entry" className="form-check-input" /> Text Entry
                            </label><br />
                            <label htmlFor="wd-website-url" className="form-check-label">
                                <input type="checkbox" id="wd-website-url" className="form-check-input" defaultChecked /> Website URL
                            </label><br />
                            <label htmlFor="wd-media-recordings" className="form-check-label">
                                <input type="checkbox" id="wd-media-recordings" className="form-check-input" /> Media Recordings
                            </label><br />
                            <label htmlFor="wd-student-annotation" className="form-check-label">
                                <input type="checkbox" id="wd-student-annotation" className="form-check-input" /> Student Annotation
                            </label><br />
                            <label htmlFor="wd-file-upload" className="form-check-label">
                                <input type="checkbox" id="wd-file-upload" className="form-check-input" /> File Upload
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-3 text-end">
                    <label htmlFor="wd-assign-to-box" className="form-label">Assign</label>
                </div>
                <div className="col-md-9">
                    <div id="wd-assign-to-box" className="p-3" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                        <div className="mb-3">
                            <label htmlFor="wd-assign-to" className="form-label">Assign to</label>
                            <input id="wd-assign-to" className="form-control" defaultValue="Everyone" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="wd-due-date" className="form-label">Due</label>
                            <input type="date" id="wd-due-date" className="form-control" defaultValue="2024-05-13" />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="wd-available-from" className="form-label">Available from</label>
                                <input type="datetime-local" id="wd-available-from" className="form-control" defaultValue="2024-05-06T12:00" />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="wd-available-until" className="form-label">Until</label>
                                <input type="datetime-local" id="wd-available-until" className="form-control" defaultValue="2024-05-28T12:00" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-light me-2">Cancel</button>
                <button type="submit" className="btn btn-danger">Save</button>
            </div>
        </div>
    );
}
