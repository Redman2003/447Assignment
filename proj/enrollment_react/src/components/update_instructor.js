import React, { useState } from 'react';
import axios from 'axios';

const Update_Instructor = () => {
    const [instructor_id, setInsID] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [newName, setNewName] = useState('');
    const [newDepartment, setNewDepartment] = useState('');
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const checkID = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/get_instructor', {
                instructor_id,
            });
            const { message, name, dept } = response.data;
            setMessage(message);
            if (message === "Instructor Found") {
                setName(name);
                setDepartment(dept);
            } else {
                setName('');
                setDepartment('');
            }
        } catch (error) {
            console.error(error)
            setMessage("Error: Unable to retrieve instructor details");
        }
    }

    const updateID = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/update_instructor', {
                instructor_id,
                new_department: newDepartment,
                new_name: newName
            });
            setNewMessage(response.data.message)
        } catch (error) {
            console.error(error)
            setNewMessage("Error: Unable to update instructor details");
        }
    }

    return (
        <div className='update_instructor'>
            <h1>Update Instructor</h1>
            <form onSubmit={checkID}>
                <label htmlFor="instructor_id">Instructor ID</label>
                <input id="instructor_id" type="text" value={instructor_id} onChange={(e) => setInsID(e.target.value)} /><br />
                <button type="submit">Find Instructor</button>
                {message && <p>{message}</p>}<br/>
            </form>
            {message === "Instructor Found" && (
                <div>
                    <label>Name</label>
                    <p>{name}</p><br/>
                    <label>Department</label>
                    <p>{department}</p><br/>
                    <form onSubmit={updateID}>
                        <label htmlFor="new_name">New Name</label>
                        <input id="new_name" type="text" value={newName} onChange={(e) => setNewName(e.target.value)} /><br />
                        <label htmlFor="new_department">New Department</label>
                        <input id="new_department" type="text" value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} /><br />
                        <button type="submit">Update Instructor</button>
                        {newMessage && <p>{newMessage}</p>}<br/>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Update_Instructor;