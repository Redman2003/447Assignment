import React, { useState } from 'react';
import axios from 'axios';

const Delete_Instructor = () => {
    const [instructor_id, setInsID] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('/delete_instructor', {
                instructor_id,  
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error)
            setMessage("Message can not be retrieved");
        }
    }
    
    return (
        <div className='delete_instructor'>
            <form onSubmit={handleSubmit}>
                <h1>Delete Instructor</h1>
                <label htmlFor="instructor_id">Instructor ID</label>
                <input id="instructor_id" type="text" value={instructor_id} onChange={(e) => setInsID(e.target.value)} /><br />
                <button type="submit">Delete Instructor</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};
 
export default Delete_Instructor;