import React  from "react"
import {useNavigate, Link} from "react-router-dom"
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

const NewUser = () => {
    const [check, setCheck] = React.useState(false)
    const [user, setUser] = React.useState({
        name:"",
        username:"",
        password:"",
        isAdmin: false,
        
     })
     const navigate = useNavigate()
     const dispatch = useDispatch();
  
     const handleChange = (e) => {
        e.preventDefault()
        
          setUser(prevValue => ({ ...prevValue, [e.target.name] : e.target.value}))
 
        }
   
        const handleAdmin = (e) => {
        
          setUser((prev) => {
            return { ...prev, isAdmin: e.target.checked };
          });
        };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(user.name === "" || user.email === "" || user.username === "" || user.password === "" )
        {return}
        addUser(user, dispatch);
        console.log(user)
        navigate("/admin/login")
     }catch(err){
        console.log(err)
     }
    }
    return (
      <Container>
      <Wrapper>
        <Title>Add new user</Title>
       
        <Form onSubmit={handleSubmit}>
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
        <div>
        <Input type="checkbox" onChange={handleAdmin} />
         <label > Is Admin</label>
        </div>
        

         <Input type="password"
        placeholder="password"
        name="password"
        onChange={handleChange}
        />
         <Button type="submit">Register</Button>
         </Form>
         </Wrapper>
         </Container>)
            
      
};

export default NewUser;