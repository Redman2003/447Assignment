import React, { useState } from 'react';
import axios from 'axios';

import './instructor.css'
 
const Delete_Student = () => {
    const [student_id, setStudentID] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('/delete_student', {
                student_id,  
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error)
            setMessage("Message can not be retrieved");
        }
    }
    
    return (
        <div className='delete_student'>
            <form onSubmit={handleSubmit}>
                <h1>Delete Student</h1>
                <label htmlFor="student_id">Student ID</label>
                <input id="student_id" type="text" value={student_id} onChange={(e) => setStudentID(e.target.value)} /><br />
                <button type="submit">Delete Student</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
    
    
};
 
export default Delete_Student