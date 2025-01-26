import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <div>
                <Link to="/">Menu</Link>
                <Link to="/cart">Cart</Link>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
