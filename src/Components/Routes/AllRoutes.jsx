import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Blogs from '../Pages/Blogs'
import PrivateRoute from './PrivateRoute'


const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blogs" element={<PrivateRoute><Blogs /></PrivateRoute>} />
            </Routes>
        </div>
    )
}

export default AllRoutes
