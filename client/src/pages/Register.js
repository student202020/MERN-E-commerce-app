import React  from "react"
import {useNavigate} from "react-router-dom"
import { login } from "../Redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/apiCalls";
import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Register = () => {
    const [user, setUser] = React.useState({
        name:"",
        username:"",
        password:"",
        
     })
     const navigate = useNavigate()
     const dispatch = useDispatch();
  
     const handleChange = (e) => {
        e.preventDefault()
        setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
        
    }
   
  const handleClick = async (e) => {
    e.preventDefault();
    try {
        if(user.name === "" ||  user.username === "" || user.password === "" )
        {return}
        addUser(user, dispatch);
        navigate("/login")
     }catch(err){
        console.log(err)
     }
    }
    return (
      <Container>
      <Wrapper>
        <Title>REGISTER</Title>
        <Form>
        <Input type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
        />
          <Input type="text"
        placeholder="username"
        name="username"
        onChange={handleChange}
        />
         <Input type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
        />
         <Button onClick={handleClick}>Register</Button>
    
         </Form>
      </Wrapper>
      </Container>)
            
      
};

export default Register;