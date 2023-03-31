import { Routes, Route } from 'react-router-dom';
import Home from "./router/Home";
import Keyword from "./router/Keyword";
import Survey from "./router/Survey";
import Mypage from "./router/Mypage";
import Result from "./router/Result";
import Navbar from "../components/Navbar";

const PrivateRoute = () => {
    return(
        <div>
            <Navbar />
            <Routes>
                <Route path="/keyword" element={<Keyword />}></Route>
                <Route path="/survey" element={<Survey />}></Route>
                <Route path="/result" element={<Result />}></Route>
                <Route path="/mypage" element={<Mypage />}></Route>
                <Route path="/home" element={<Home />}></Route>
            </Routes>
        </div>
    )
}

export default PrivateRoute;