import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import ProductJedan from "./pages/ProductJedan";

import Footer from "./components/Footer";
import Header from "./components/Header";


  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
    
        {
          path: "/product/:id",
          element: <ProductJedan />,
        },
    
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order",
          element: <Order />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  
  function App() {
    return (
      <div>
        <div>
          <RouterProvider router={router} />
        </div>
      </div>
    );
  }

export default App;
