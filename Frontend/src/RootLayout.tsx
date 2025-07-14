import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/GlobalComponents/Header/header";
import Footer from "./components/GlobalComponents/Footer/footer";
import NavBar from "./components/GlobalComponents/NavBar/navBar";

export default function RootLayout() {
  const location = useLocation();
  const isCategoryPage = location.pathname.startsWith("/category");

  return (
    <>
      <Header />
      <NavBar variant={isCategoryPage ? "category" : undefined} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}