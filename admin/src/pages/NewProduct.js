import React from "react"
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Redux/apiCalls";
import axios from "axios"
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

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;


const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterOption = styled.option``;


const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;


 const NewProduct = () => {
    const [category, setCategory] = React.useState("")
    const [file, setFile] = React.useState(null)
    const [prodd, setProdd] = React.useState({
        name:"",
        desc:"",
        price: 0,
        
     })
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const handleChange = (e) => {
        e.preventDefault()
        setProdd(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
        
    }
    const upload = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axios.post("http://localhost:4000/api/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };


        const handleSubmit = async(e) => {
            e.preventDefault()
            try{
            const imgUrl = await upload()
            if(prodd.name === ""){return}
            
           
                addProduct({
                  name:prodd.name,
                  desc: prodd.desc,
                  price: prodd.price,
                  category: category,
                  image: file ? imgUrl.filename : "",
              }, dispatch)
                navigate("/admin")
              }catch(err){console.log("greska")}
         
         
        }
        
    return(
      <Container>
      <Wrapper>
      <Link to="http://localhost:3000/admin">Home</Link> 
        <Title>Add new product ...</Title>
        <Form>
        
        <Input type="text"
        placeholder="name"
        name="name"
        onChange={handleChange}
        />
        <Input type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
        />
         <Input type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
        />

            <Filter>
            <FilterTitle htmlFor="cat" >Category:</FilterTitle>
            <FilterSize name="cat" id="cat" onChange={(e) => setCategory(e.target.value)}>
            <FilterOption value="">Category</FilterOption>
            <FilterOption value="woman">woman</FilterOption>
            <FilterOption value="man">man</FilterOption>
            <FilterOption value="children">children</FilterOption>
            </FilterSize>
            </Filter>
         <Input type="file"
          id="file" 
          style={{display:"none"}}
          onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <Title>Add image</Title>
          </label>
         <Button onClick={handleSubmit}>Add new product</Button>
         </Form>
         </Wrapper>
         </Container>
     
    )
}
export default NewProduct