import React  from "react"
import { login } from "../Redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate} from "react-router-dom"
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

const Login = () => {
    const [user, setUser] = React.useState({
        username:"",
        password:"",
        
     })

     const dispatch = useDispatch();
     const { currentUser } = useSelector((state) => state.user);
  
     const handleChange = (e) => {
        e.preventDefault()
        setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
        
    }
   
    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch,  user );
  
    };
       if(currentUser){return <Navigate to="/" />}
       else{
    return (
        <Container>
        <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
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
         <Button onClick={handleClick}>Login</Button>
    
         </Form>
         </Wrapper>
         </Container>
            )
       }        
      
};

export default Login;