import React, { useState } from "react";
import axios from "axios";
 
const Add_Student = () => {
    const [student_id, setID] = useState('')
    const [name, setName] = useState('')
    const [num_credits, setCredits] = useState('')
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.post('/add_student', {
                student_id,
                name,
                num_credits
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error)
            setMessage("Message can not be retrieved");
        }
    }

    return (
        <div className="form-container">
            <h1>Add Student</h1>
            <form onSubmit={handleSubmit}>
                <label>Student ID</label>
                <input type="text" value={student_id} onChange={(e) => setID(e.target.value)} /><br />
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>Num. Credits</label>
                <input type="text" value={num_credits} onChange={(e) => setCredits(e.target.value)} /><br />
                <button type="submit">Add Student</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};
 
export default Add_Student;