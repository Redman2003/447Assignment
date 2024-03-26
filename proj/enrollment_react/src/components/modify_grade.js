import React, { useState } from "react";
import axios from "axios";
 
const Modify_Grade = () => {

    const [student_id, set_student] = useState('');
    const [course_id, set_course] = useState('');
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [course_title, setCourseTitle] = useState('');
    const [instructor_id, setInsID] = useState('');
    const [name, setName] = useState('');
    const [num_credits, setNumCred] = useState('');
    const [grade, setGrade] = useState('')


    const verifyEnrollment = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/verify_student', {
                student_id,
                course_id
            });
            setMessage1(response.data.message)
            setInsID(response.data.instructor_id)
            setCourseTitle(response.data.course_title)
            setName(response.data.student_name)
            setNumCred(response.data.num_creds)
        } catch (error) {
            console.error(error);
            setMessage1("Error: Unable to retrieve student enrollment info");
        }
    }



    const postGrade = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/post_grade', {
                grade,
                student_id,
                course_id
            });
            setMessage2(response.data.message)
        } catch (error) {
            console.error(error);
            setMessage2("Error: Unable to post grade");
        }
    }
    

    return (
        <div className="form-container">
            <h1>Post Grade</h1>
            <form onSubmit={verifyEnrollment}>
                <label htmlFor="course_id">Course ID</label>
                <input id="course_id" type="text" value={course_id} onChange={(e) => set_course(e.target.value)} /><br />
                <label htmlFor="student_id">Student ID</label>
                <input id="student_id" type="text" value={student_id} onChange={(e) => set_student(e.target.value)} /><br />
                <button type="submit">Find Course</button>
                {message1 && <p>{message1}</p>}<br/>
            </form>
            {message1 === "Student Enrolled" && (
                <div>
                    <label>Name</label>
                    <p>{name}</p><br/>
                    <label>Num. Credits</label>
                    <p>{num_credits}</p><br/>
                    <br/>
                    <br/>
                    <label>Course Title</label>
                    <p>{course_title}</p><br/>
                    <label>Instructor ID</label>
                    <p>{instructor_id}</p><br/>
                    <form onSubmit={postGrade}>
                        <label htmlFor="grade">Course Grade</label>
                        <input id="grade" type="text" value={grade} onChange={(e) => setGrade(e.target.value)} /><br />
                        <button type="submit" >Post Grade</button>
                        {message2 && <p>{message2}</p>}<br/>
                    </form>
                </div>
            )}
        </div>
    );


};
 
export default Modify_Grade;