import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios.get("/index")
            .then((response) => {
                const res = response.data;
                setProfileData({
                    Welcome: res.welcome,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>{
                profileData && profileData.Welcome}
            </h1> 
            <br />
            <ul>
                <li className='link1'>
                
                    <Link to="/add_instructor">Add Instructor</Link>
                </li>
                <li className='link2'>
                    <Link to="/update_instructor">Update Instructor</Link>
                </li>
                <li className='link3'>
                    <Link to="/delete_instructor">Delete Instructor</Link>
                </li>
                <br />
                <br />
            </ul>
            <ul>
                <li className='link4'>
                 
                    <Link to="/add_course">Add Course</Link>
                </li>
                <li className='link5'>
                 
                    <Link to="/update_course">Update Course</Link>
                </li>
                <li className='link6'>
                    <Link to="/delete_course">Delete Course</Link>
                </li>
                <br />
                <br />
                <li className='link7'>
                   
                    <Link to="/add_student">Add Student</Link>
                </li>
                <li className='link8'>
                   
                    <Link to="/update_student">Update Student </Link>
                </li>
                <li className='link9'>
                    <Link to="/delete_student">Delete Student </Link>
                </li>
                <br />
                <br />
                <li className='link10'>
                   
                    <Link to="/enroll_student">Enroll Student</Link>
                </li>
                <li className='link11'>
                   
                    <Link to="/drop_student">Drop Student </Link>
                </li>
                <li className='link12'>
                    <Link to="/modify_grade">Modify Grade </Link>
                </li>
            </ul>   
        </div>
    );
};

export default Home;