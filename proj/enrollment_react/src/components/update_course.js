import React, { useState } from 'react';
import axios from 'axios';

 
const Update_Course = () => {

    const [course_id, setCourseId] = useState('');
    const [course_title, setCourseTitle] = useState('');
    const [instructor_id, setInsID] = useState('');
    const [message, setMessage] = useState('');
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newInstructorID, setNewInstructorID] = useState('');
    const [newMessage, setNewMessage] = useState('');




    const checkID = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/get_course', {
                course_id,
            });
            const { message, courseTitle, instructorID } = response.data;
            setMessage(message);
            if (message === "Course Found") {
                setCourseTitle(response.data.course_title);
                setInsID(response.data.instructor_id);
            } else {
                setCourseTitle('');
                setInsID('');
            }
        } catch (error) {
            console.error(error)
            setMessage("Error: Unable to retrieve instructor details");
        }
    }

    const updateID = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/update_course', {
                course_id,
                new_course_title: newCourseTitle,
                new_instructor_id: newInstructorID
            });
            setNewMessage(response.data.message)
        } catch (error) {
            console.error(error)
            setNewMessage("Error: Unable to update instructor details");
        }
    }

    
    return (
        <div className='update_course'>
            <h1>Update Course</h1>
            <form onSubmit={checkID}>
                <label htmlFor="course_id">Course ID</label>
                <input id="course_id" type="text" value={course_id} onChange={(e) => setCourseId(e.target.value)} /><br />
                <button type="submit">Find Course</button>
                {message && <p>{message}</p>}<br/>
            </form>
            {message === "Course Found" && (
                <div>
                    <label>Course Title</label>
                    <p>{course_title}</p><br/>
                    <label>Instructor ID</label>
                    <p>{instructor_id}</p><br/>
                    <form onSubmit={updateID}>
                        <label htmlFor="newCourseTitle">New Course Title</label>
                        <input id="newCourseTitle" type="text" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} /><br />
                        <label htmlFor="newInstructorID">New Instructor ID</label>
                        <input id="newInstructorID" type="text" value={newInstructorID} onChange={(e) => setNewInstructorID(e.target.value)} /><br />
                        <button type="submit">Update Instructor</button>
                        {newMessage && <p>{newMessage}</p>}<br/>
                    </form>
                </div>
            )}
        </div>
    );
};
 
export default Update_Course;