import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./Pages/HomePage/home";
import Jogo from "./Pages/Jogo/jogo";
import Login from "./Pages/Login/login";
import About from "./Pages/About/about";
import Carrinho from "./Pages/Carrinho/carrinho";
import InConstrution from "./Pages/InConstrution/InConstrution";
import Cadastro from "./Pages/Cadastro/Cadastro";
import CategoryPage from "./Pages/Category/Category";
import Wishlist from "./Pages/Wishlist/wishlist";
import Biblioteca from "./Pages/Biblioteca/Biblioteca";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Jogo/:jogoID",
        element: <Jogo />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/carrinho",
        element: <Carrinho />,
      },
      {
        path: "/category/:categoria",
        element: <CategoryPage />
      },
      {
        path: "/wishlist",
        element: <Wishlist />
      },
      {
        path: "/biblioteca",
        element: <Biblioteca />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/inConstrution",
    element: <InConstrution />,
  },
]);
export default router;
