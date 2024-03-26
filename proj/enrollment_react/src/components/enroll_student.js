import React, { useState } from "react";
import axios from "axios";

const Enroll_Student = () => {
    const [student_id, set_student] = useState('');
    const [course_id, set_course] = useState('');
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [message3, setMessage3] = useState('');
    const [course_title, setCourseTitle] = useState('');
    const [instructor_id, setInsID] = useState('');
    const [name, setName] = useState('');
    const [num_credits, setNumCred] = useState('');

    const checkCourse = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/get_course', {
                course_id,
            });
            const { message } = response.data;
            setMessage1(message);
            if (message === "Course Found") {
                setCourseTitle(response.data.course_title);
                setInsID(response.data.instructor_id);
            } else {
                setCourseTitle('');
                setInsID('');
            }
        } catch (error) {
            console.error(error);
            setMessage1("Error: Unable to retrieve course details");
        }
    }

    const checkStudent = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/get_student', {
                student_id,
            });
            const { message } = response.data;
            setMessage2(message);
            if (message === "Student Found") {
                setNumCred(response.data.num_credits);
                setName(response.data.name);
            } else {
                setNumCred('');
                setName('');
            }
        } catch (error) {
            console.error(error);
            setMessage2("Error: Unable to retrieve student details");
        }
    }

    const enrollStudent = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/enroll_student', {
                student_id,
                course_id
            });
            setMessage3(response.data.message)
        } catch (error) {
            console.error(error);
            setMessage3("Error: Unable to retrieve student details");
        }
    }


    return (
        <div className="form-container">
            <h1>Enroll Student</h1>
            <form onSubmit={checkCourse}>
                <label htmlFor="course_id">Course ID</label>
                <input id="course_id" type="text" value={course_id} onChange={(e) => set_course(e.target.value)} /><br />
                <button type="submit">Find Course</button>
                {message1 && <p>{message1}</p>}<br/>
            </form>
            {message1 === "Course Found" && (
                <div>
                    <label>Course Title</label>
                    <p>{course_title}</p><br/>
                    <label>Instructor ID</label>
                    <p>{instructor_id}</p><br/>
                    <form onSubmit={checkStudent}>
                        <label htmlFor="student_id">Student ID</label>
                        <input id="student_id" type="text" value={student_id} onChange={(e) => set_student(e.target.value)} /><br />
                        <button type="submit" disabled={message1 !== "Course Found"}>Find Student</button>
                        {message2 && <p>{message2}</p>}<br/>
                    </form>
                    {message2 === "Student Found" && (
                        <div>
                            <label>Name</label>
                            <p>{name}</p><br/>
                            <label>Num. Credits</label>
                            <p>{num_credits}</p><br/>
                            <form onSubmit={enrollStudent}>
                                <button type="submit">Enroll Student</button>
                                {message3 && <p>{message3}</p>}<br/>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Enroll_Student;