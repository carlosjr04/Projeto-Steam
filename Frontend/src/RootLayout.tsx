import { Outlet } from "react-router-dom";
import Header from "./components/GlobalComponents/Header/header";
import Footer from "./components/GlobalComponents/Footer/footer";
import NavBar from "./components/GlobalComponents/NavBar/navBar";


export default function RootLayout(){
    return(
        <>
            <Header/>
            <NavBar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}