import React, { useState } from 'react';
import axios from 'axios';
import './instructor.css'
 
const Delete_Course = () => {
    const [course_id, setCourseID] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('/delete_course', {
                course_id,  
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error)
            setMessage("Message can not be retrieved");
        }
    }
    
    return (
        <div className='delete_course'>
            <form onSubmit={handleSubmit}>
                <h1>Delete Course</h1>
                <label htmlFor="course_id">Course ID</label>
                <input id="course_id" type="text" value={course_id} onChange={(e) => setCourseID(e.target.value)} /><br />
                <button type="submit">Delete Course</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );

    
};
 
export default Delete_Course;