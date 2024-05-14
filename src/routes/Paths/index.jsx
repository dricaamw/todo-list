import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import Home from "../../pages/Home";

const Paths = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="*" element={
                <>
                <h1>Página não encontrada</h1>
                <a href="/">Voltar</a>
                </>}/>
            </Routes>
        </BrowserRouter>
     );
}
 
export default Paths;