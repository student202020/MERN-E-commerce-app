import React from "react"
import {Link, useNavigate} from "react-router-dom"
import {publicRequest} from "../requestMethods"
import {useSelector, useDispatch} from "react-redux"
import {logout} from "../Redux/apiCalls"
import styled from "styled-components";



const Title = styled.h3`
  margin: 10px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Span = styled.span`
  width: 10%;
  display: flex;
  color: grey;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 15px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;

`;

const Container = styled.div`
  display: flex;
  min-width: 280px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Option = styled.option``;



 const Home = () => {
    const [products, setProducts] = React.useState([])
    const [productss, setProductss] = React.useState([])
    const [category, setCategory] = React.useState("")
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()

    React.useEffect(() =>{
        const dohvati = async () => {
            const res = await publicRequest.get("/products");
            setProducts(res.data)
            setProductss(res.data)
        }
        dohvati()
    }, [])
     
    React.useEffect(() =>{
        const newP = products.filter(item =>  item.category === category)
        if(category === "All"){setProductss(products)} 
        else{setProductss(newP)}
       
    }, [category])

  

    const navigate = useNavigate()
    const handleLog = (e) => {
        e.preventDefault();
        logout(dispatch);
        navigate("/")
    }
    return(
      <>
            <FilterContainer>
            <Title><Link to="/cart">Cart</Link></Title> 
            <Span>
            <p>{user && user.name}</p>
            {user !== null ? <button onClick={handleLog}>Log out</button> : <div><Link to="/register">Register</Link> <Link to="/login">Log in</Link> </div>}
            </Span>
            </FilterContainer>
           
            <FilterContainer>
            <Title>Search our products...</Title>
            <Filter>
            <FilterText htmlFor="cat">Category:</FilterText>
            <Select name="category" id="cat" onChange={(e) => setCategory(e.target.value)}>
            <Option value="All">All</Option>
            <Option value="woman">woman</Option>
            <Option value="man">man</Option>
            <Option value="children">children</Option>
            </Select>
            </Filter>
            </FilterContainer>
             <Container>
            
            {productss.map(item => {return(
                <div>
                   
                       <Link to={`http://localhost:3001/product/${item._id}`} state={{...item}}><h5>{item.name}</h5></Link>
                       <p>{item.desc}</p>
                       <Image src={`../uploads/${item.image}`} alt="" width="300" height="200"/>
                       <FilterText>{item.price} $</FilterText>

                </div>
            )})}
              
       </Container>
       </>
    )
}
export default Home