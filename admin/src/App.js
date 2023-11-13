
import './App.css';
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUser from "./pages/NewUser";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import NewProduct from "./pages/NewProduct";
import Product from "./pages/Product";
import { useSelector } from "react-redux";


 function App() {
const currentUser = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/admin/login" element={<Login />}/>
        <Route path="/admin/register" element={<NewUser />}/>
        {currentUser && <>
    
          <Route exact path="/admin" element={<AdminHome />} />
          <Route path="/admin/product/:id" element={<Product />} />
          <Route path="/admin/product" element={<NewProduct />} />
        
        </>}
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;





