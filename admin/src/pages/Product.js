import React, { useEffect } from "react"
import {useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../Redux/apiCalls";
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
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
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

 const Product = () => {

    const location = useLocation()
    const { id, name, desc, price } = location.state

  const { products } = useSelector((state) => state.product);
  const aa = products[products.findIndex((item) => item._id === id)]

  const [category, setCategory] = React.useState(aa.category)
  const [file, setFile] = React.useState(aa.image)
    const [product1, setProduct1] = React.useState({
        _id:id,
        name:name,
        desc:desc,
        price: price,
        
     })
     const navigate = useNavigate()
     const dispatch = useDispatch();

     
     useEffect(() => {
      
        console.log(aa)
     }, [])

     const handleChange = (e) => {
        e.preventDefault()
        setProduct1(prevValue => ({...prevValue, [e.target.name]: e.target.value}))
        
    }

    const handleSubmit = async () => {
       
            try{
              updateProduct(id, product1, dispatch)
              console.log("Product updated")
              console.log(product1)
              navigate("/admin")
            }catch(err){console.log(err)}
       
        }
    return(
      <Container>
      <Wrapper>
     
        <Title>Update product</Title>
        <Form>
        
        <Input type="text"
        placeholder={aa.name}
        name="name"
        onChange={handleChange}
        />
        <Input type="text"
        placeholder={aa.desc}
        name="desc"
        onChange={handleChange}
        />
         <Input type="number"
        placeholder={aa.price}
        name="price"
        onChange={handleChange}
        />
         <Filter>
            <FilterTitle htmlFor="cat" >Update category:</FilterTitle>
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
            <Title>Update image</Title>
          </label>
         <Button onClick={handleSubmit}>Update</Button>
         </Form>
         </Wrapper>
         </Container>
    )
}
export default Product