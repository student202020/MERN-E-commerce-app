import React from "react"
import {useLocation, Link, useNavigate} from "react-router-dom"
import { addCart } from "../Redux/apiCalls"
import {useDispatch} from "react-redux"
import styled from "styled-components";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;
 const Order = () => {

    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { podaci } = location.state

    const handleClick = (e) => {
     e.preventDefault();
     addCart( podaci, dispatch)
     navigate("/")
     console.log(podaci)

    }
    return(
        <Container>
        <Wrapper>
        <InfoContainer>
            <Title>{`You ${podaci.userName} have picked up this product for purchase !`}</Title>
            <div>Product number: {podaci.products[0].productId}</div>
            <div>Product: {podaci.name}</div>
            <div>Description: {podaci.desc}</div>
            <div>Price: {podaci.price}</div>
            <div>Size: {podaci.size}</div>
            <div>Color: {podaci.color}</div>
            <div>Quantity: {podaci.products[0].quantity}</div>
            
            <Link to="/"><Button onClick={handleClick} >Add</Button></Link>
        </InfoContainer>
        </Wrapper>
        </Container>
       
       
    )
}
export default Order