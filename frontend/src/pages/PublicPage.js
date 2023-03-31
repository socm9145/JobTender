import { Routes, Route } from 'react-router-dom';
import Welcome from "./router/Welcome";
import Login from "./router/Login";
import Navbar from "../components/Navbar";

const PublicPage = () => {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    )
}

export default PublicPage;