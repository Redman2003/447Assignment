import React, { useState } from 'react';
import axios from 'axios';
 
const UpdateStudent = () => {
    const [student_id, setStuID] = useState('');
    const [name, setName] = useState('');
    const [num_credits, setNumCred] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumCredits, setNewNumCred] = useState('');
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const checkID = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/get_student', {
                student_id,
            });
            const { message} = response.data;
            setMessage(message);
            if (message === "Student Found") {
                setName(response.data.name);
                setNumCred(response.data.num_credits);
            } else {
                setName('');
                setNumCred('');
            }
        } catch (error) {
            console.error(error)
            setMessage("Error: Unable to retrieve student details");
        }
    }

    const updateID = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/update_student', {
                student_id,
                new_num_credits: newNumCredits,
                new_name: newName
            });
            setNewMessage(response.data.message)
        } catch (error) {
            console.error(error)
            setNewMessage("Error: Unable to update student details");
        }
    }

    return (
        <div className='update_student'>
            <h1>Update Student</h1>
            <form onSubmit={checkID}>
                <label htmlFor="student_id">Student ID</label>
                <input id="student_id" type="text" value={student_id} onChange={(e) => setStuID(e.target.value)} /><br />
                <button type="submit">Find Student</button>
                {message && <p>{message}</p>}<br/>
            </form>
            {message === "Student Found" && (
                <div>
                    <label>Name</label>
                    <p>{name}</p><br/>
                    <label>Num. Credits</label>
                    <p>{num_credits}</p><br/>
                    <form onSubmit={updateID}>
                        <label htmlFor="new_name">New Name</label>
                        <input id="new_name" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /><br />
                        <label htmlFor="new_num_credits">New Num. Credits</label>
                        <input id="new_num_credits" type="text" value={newNumCredits} onChange={(e) => setNewNumCred(e.target.value)} /><br />
                        <button type="submit">Update Student</button>
                        {newMessage && <p>{newMessage}</p>}<br/>
                    </form>
                </div>
            )}
        </div>
    );
};
 
export default UpdateStudent;