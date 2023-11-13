import React from "react"
import {userRequest} from "../requestMethods"
import {useSelector} from "react-redux"


 const Cart = () => {
   const[cart, setCart] = React.useState([])
   const user = useSelector((state) => state.user.currentUser);
 
   
   React.useEffect(() => {
    const dohvati = async () => {
       
        const res = await userRequest.get(`/cart/find/${user._id}`);
        setCart(res.data)
        console.log(user.name)
        console.log(res.data)
    }
    {user && dohvati()};
   }, [])
    
    return(
        <div>
          Cart
          {user && cart.map(item => {
            return(<div>
            <p> {item._id}</p>
            <p>User id: {item.userId}</p>
            <p>Product ID:{item.products[0].productId}</p>
            <p>---------</p>
            </div>)
          })}
        </div>
    )
}
export default Cart