import { useState } from 'react'
import "./App.css";
import axios from "axios";

// importing components from react-router-dom package
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
 
// import Home component
import Home from "./components/Home";

import Add_Instructor from "./components/add_instructor";
import Update_Instructor from "./components/update_instructor";
import Delete_Instructor from "./components/delete_instructor";
import Add_Course from "./components/add_course";
import Update_Course from "./components/update_course";
import Delete_Course from "./components/delete_course";
import Add_Student from "./components/add_student";
import Update_Student from "./components/update_student";
import Delete_Student from "./components/delete_student";
import Enroll_Student from "./components/enroll_student";
import Drop_Student from "./components/drop_student";
import Modify_Grade from "./components/modify_grade";
 
 
 
function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home/>}
                    />
                    <Route
                        path="/add_instructor"
                        element={<Add_Instructor />}
                    />
                    <Route
                        path="/update_instructor"
                        element={<Update_Instructor />}
                    />
                    <Route
                        path="/delete_instructor"
                        element={<Delete_Instructor />}
                    />
                    <Route
                        path="/add_course"
                        element={<Add_Course />}
                    />
                    <Route
                        path="/update_course"
                        element={<Update_Course />}
                    />
                    <Route
                        path="/delete_course"
                        element={<Delete_Course />}
                    />
                    <Route
                        path="/add_student"
                        element={<Add_Student />}
                    />
                    <Route
                        path="/update_student"
                        element={<Update_Student />}
                    />
                    <Route
                        path="/delete_student"
                        element={<Delete_Student />}
                    />
                     <Route
                        path="/enroll_student"
                        element={<Enroll_Student/>}
                    />
                     <Route
                        path="/drop_student"
                        element={<Drop_Student/>}
                    />
                     <Route
                        path="/modify_grade"
                        element={<Modify_Grade/>}
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                </Routes>
            </Router>
        </>
    );
}
 
export default App;