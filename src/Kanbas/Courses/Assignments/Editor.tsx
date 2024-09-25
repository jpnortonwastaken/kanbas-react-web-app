export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <table>
                <tr>
                    <td>
                        <label htmlFor="wd-name"><b>Assignment Name</b></label><br />
                        <input id="wd-name" value="A1 - ENV + HTML" style={{ width: '100%' }} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <label htmlFor="wd-description">Description</label><br />
                        <textarea id="wd-description">
                            The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.
                        </textarea>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="Assignments">Assignments</option>
                            <option value="Quizzes">Quizzes</option>
                            <option value="Exams">Exams</option>
                            <option value="Labs">Labs</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="percentage">Percentage</option>
                            <option value="points">Points</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <label htmlFor="wd-text-entry">
                            <input type="checkbox" id="wd-text-entry" /> Text Entry
                        </label><br />

                        <label htmlFor="wd-website-url">
                            <input type="checkbox" id="wd-website-url" /> Website URL
                        </label><br />

                        <label htmlFor="wd-media-recordings">
                            <input type="checkbox" id="wd-media-recordings" /> Media Recordings
                        </label><br />

                        <label htmlFor="wd-student-annotation">
                            <input type="checkbox" id="wd-student-annotation" /> Student Annotation
                        </label><br />

                        <label htmlFor="wd-file-upload">
                            <input type="checkbox" id="wd-file-upload" /> File Upload
                        </label><br />
                    </td>
                </tr>

                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Assign</label>
                    </td>
                    <td>
                        <label htmlFor="wd-assign-to">Assign to</label><br />
                        <input id="wd-assign-to" value="Everyone" style={{ width: '100%' }} />

                        <label htmlFor="wd-due-date">Due Date</label><br />
                        <input type="date" id="wd-due-date" value="2024-05-13" style={{ width: '100%' }} />

                        <label htmlFor="wd-available-from">Available from</label><br />
                        <input type="date" id="wd-available-from" value="2024-05-06" style={{ width: '100%' }} />

                        <label htmlFor="wd-available-until">Available until</label><br />
                        <input type="date" id="wd-available-until" value="2024-05-28" style={{ width: '100%' }} />
                    </td>
                </tr>
            </table>

            <hr />

            <div style={{ textAlign: 'right' }}>
                <button type="button">Cancel</button>
                <button type="submit">Save</button>
            </div>
        </div>
    );
}
