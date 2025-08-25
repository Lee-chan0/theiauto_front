import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isNewsPage = location.pathname.includes('/news');

  return (
    <>
      <Nav />
      <main style={isNewsPage ? { background: '#f2f2f2' } : {}}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout;