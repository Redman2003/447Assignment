// App.jsx

import React , {useState} from "react";
import axios from "axios";
 
const Add_Course = () => {
    const [courseID, setCourseID] = useState('')
    const [instructor_id, setInsID] = useState('')
    const [courseTitle, setTitle] = useState('')
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post('/add_course', {
                courseID,
                instructor_id,
                courseTitle
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error)
            setMessage("Message can not be retrieved");
        }
    }

    return (
        <div>
             <div className="form-container">
            <h1>Add Course</h1>
            <form onSubmit={handleSubmit}>
                <label>Course ID</label>
                <input type="text" value={courseID} onChange={(e) => setCourseID(e.target.value)} /><br />
                <label>Instructor ID</label>
                <input type="text" value={instructor_id} onChange={(e) => setInsID(e.target.value)} /><br />
                <label>Course Title</label>
                <input type="text" value={courseTitle} onChange={(e) => setTitle(e.target.value)} /><br />
                <button type="submit">Add Course</button>
                {message && <p>{message}</p>}
            </form>
        </div>
        </div>
    );
};
 
export default Add_Course;