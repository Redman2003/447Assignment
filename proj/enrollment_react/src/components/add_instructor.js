import React, { useState } from "react";
import axios from "axios";

import './instructor.css'

const Add_Instructor = () => {
    const [instructor_id, setID] = useState('')
    const [name, setName] = useState('')
    const [course_dept, setDept] = useState('')
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('/add_instructor', {
                instructor_id,
                name,
                course_dept
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error)
            setMessage("Message can not be retrieved");
        }
    }

    return (
        <div className="form-container">
            <h1>Add Instructor</h1>
            <form onSubmit={handleSubmit}>
                <label>Instructor ID</label>
                <input type="text" value={instructor_id} onChange={(e) => setID(e.target.value)} /><br />
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>Course Dept.</label>
                <input type="text" value={course_dept} onChange={(e) => setDept(e.target.value)} /><br />
                <button type="submit">Add Instructor</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Add_Instructor;