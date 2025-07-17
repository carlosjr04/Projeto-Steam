
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
import SearchPage from "./Pages/Search/Search";
import NotFound from "./components/GlobalComponents/NotFound/NotFound";
import PublicOnlyRoute from "./components/GlobalComponents/PublicOnlyRoute/PublicOnlyRoute";


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
      },
      {
        path: "/games/:gameId",
        element: <SearchPage />
      },
      {
        path: "/games",
        element: <SearchPage />
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
  {
    path: "/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/cadastro",
    element: (
      <PublicOnlyRoute>
        <Cadastro />
      </PublicOnlyRoute>
    ),
  },
  {
    path: "/inConstrution",
    element: <InConstrution />,
  },
]);
export default router;
