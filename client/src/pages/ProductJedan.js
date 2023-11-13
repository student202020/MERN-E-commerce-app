import React from "react"
import {useLocation, Link} from "react-router-dom"
import {useSelector} from "react-redux"
import styled from "styled-components";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  width:50%;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
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
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
`;




 const ProductJedan = () => {

    const location = useLocation()
    const [size, setSize] = React.useState("")
    const [color, setColor] = React.useState("")
    const [quantity, setQuantity] = React.useState(1)
    const [podaci, setPodaci] = React.useState({})
    const {name, desc, price, _id, image} = location.state
    const user = useSelector((state) => state.user.currentUser);
    

   React.useEffect(() => {setPodaci(
    {
    products:[{productId: _id, quantity:quantity}],
    price:price,
    image:image,
    size:size,
    color:color,
    name:name,
    desc:desc,
    userId: (user ? user._id : null),
    userName:(user ? user.name : null)}
   )}, [user, _id, color, size, quantity])

  
    return(
      <Container>
           <Wrapper>
            <InfoContainer>
             <Title>{name}</Title>
             <Desc>{desc}</Desc>
             <Price>$ {price}</Price>
            </InfoContainer>
             <ImgContainer>
             <Image src={`../uploads/${image}`} alt="" width="300" height="200"/>
             </ImgContainer>
          
             <FilterContainer>
                        
             {user && <>
              <Filter>
              <FilterTitle htmlFor="size" >Size</FilterTitle>
           
            <FilterSize name="size" id="size" onChange={(e) => setSize(e.target.value)}>
            <FilterOption value="">Size</FilterOption>
            <FilterOption value="S">S</FilterOption>
            <FilterOption value="M">M</FilterOption>
            <FilterOption value="L">L</FilterOption>
            <FilterOption value="XL">XL</FilterOption>
            </FilterSize>
            </Filter>
            <Filter>
            <FilterTitle htmlFor="color">Color:</FilterTitle>
            <FilterSize name="color" id="color" onChange={(e) => setColor(e.target.value)}>
            <FilterOption value="">Color</FilterOption>
            <FilterOption value="red">Red</FilterOption>
            <FilterOption value="navy">Navy</FilterOption>
            <FilterOption value="blue">Blue</FilterOption>
            <FilterOption value="white">White</FilterOption>
            </FilterSize>
            </Filter>
            <Filter>
            <FilterTitle htmlFor="quantity">Quantity:</FilterTitle>
            <FilterSize name="quantity" id="quantity" onChange={(e) => setQuantity(e.target.value)}>
            <FilterOption value="">Quantity</FilterOption>
            <FilterOption value="2">2</FilterOption>
            <FilterOption value="3">3</FilterOption>
            <FilterOption value="4">4</FilterOption>
            <FilterOption value="5">5</FilterOption>
            </FilterSize>
            </Filter>
            <Link to="/order" state={{podaci}}><Button >Add to chart</Button></Link></>}
            </FilterContainer>
           
          </Wrapper>
      </Container>
    )
}
export default ProductJedan
