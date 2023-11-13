import React from "react"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, updateUser,  getProducts, updateProduct, deleteProduct } from "../Redux/apiCalls";
import { logout } from "../Redux/apiCalls";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 50px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Span = styled.span`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  margin-left:10px;
  border: 2px;
  padding: 5px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom:20px;
`;


 const AdminHome = () => {

   
    const { currentUser } = useSelector((state) => state.user);
    const useri = useSelector((state) => state.user.users);
    const {products} = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      console.log(currentUser)
      !currentUser && navigate("/admin/login")
    
    }, []);

    useEffect(() => {
      currentUser && getUsers(dispatch);
      }, [dispatch]);

      useEffect(() => {
        currentUser && getProducts(dispatch);
      }, [dispatch]);

      const handleClick = (e) => {
        e.preventDefault();
        logout(dispatch);
        navigate("/admin/login")
      };
   
      const handleDelete = (id) => {
        deleteProduct(id, dispatch);
        
      }
      const handleDeleteUser = (id) => {
        deleteUser(id, dispatch);
        
      }


    return(
        <div>
       <Span>
        <h1>Welcome {currentUser && currentUser.name}</h1>
        {currentUser && <Button onClick={handleClick}>logout</Button>} 
        </Span>
       {currentUser && currentUser.isAdmin && <Link to="http://localhost:3000/admin/register"><Button>add new user</Button></Link>}
      
        {currentUser && currentUser.isAdmin && <Link to="http://localhost:3000/admin/product"><Button>add new product</Button></Link>} 
             
        <Container>
          <Wrapper>
            <Title>USERS</Title>
           
            <br/>
           {Array.isArray(useri) && useri.map(item => {
            return(
                <Span>
                  <p>{item.name}</p>
                  <Button onClick={()=> handleDeleteUser(item._id)}>Delete</Button>
                  </Span>
            )
           })}
           </Wrapper>
           <Wrapper>
           <Title>PRODUCTS</Title>
          
            <br/>
           {Array.isArray(products) && products.map(item => {
            return(
                <Span>
                  <p>{item.name}</p>
                  <div>
                  <Link to={`http://localhost:3000/admin/product/${item._id}`} state={{ id: item._id, name:item.name, desc: item.desc, price: item.price }}><Button>Update</Button></Link>
                  <Button onClick={()=> handleDelete(item._id)}>Delete</Button>
              
                  </div>
              </Span>
            )
           })}
           </Wrapper>
          </Container>
        </div>
    )
}
export default AdminHome