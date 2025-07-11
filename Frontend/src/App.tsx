
import { RouterProvider } from 'react-router-dom'
import './App.css'
import CarrosselHome from './components/HomeComponents/CarrosselHome/carrosselHome'
import CarrosselHomeSlide from './components/HomeComponents/CarrosselHomeSlide/CarrosselHomeSlide'
import CategoryCarousel from './components/HomeComponents/CategoriaCarrossel/CateforiaCarrossel'
import CategoriaSlide from './components/HomeComponents/CategoriaSlide/CategoriaSlide'
import Footer from './components/GlobalComponents/Footer/footer'
import Header from './components/GlobalComponents/Header/header'
import NavBar from './components/GlobalComponents/NavBar/navBar'
import router from "./router";

function App() {
  return <RouterProvider router = {router}/>
}

export default App
