import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import { useEffect } from "react";

function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = () => {
        dispatch(userActions.logout());
        navigate("/auth/login");
    };
    return (
        <div className={styles.layout} data-testid="layout">
            <div className={styles.sidebar} data-testid="sidebar">
                <div className={styles.user} data-testid="user-info">
                    <img
                        src="/avatar.png"
                        alt="Avatar"
                        className={styles.avatar}
                        data-testid="user-avatar"
                    />
                    <div className={styles.username} data-testid="user-name">
                        {profile?.name}
                    </div>
                    <div className={styles.email} data-testid="user-email">
                        {profile?.email}
                    </div>
                </div>
                <div className={styles.menu} data-testid="menu">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive,
                            })
                        }
                        data-testid="menu-link-home"
                    >
                        <img src="/menu-icon.svg" alt="Menu Icon" />
                        Menu
                    </NavLink>
                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            cn(styles.link, {
                                [styles.active]: isActive,
                            })
                        }
                        data-testid="menu-link-cart"
                    >
                        <img src="/cart-icon.svg" alt="Cart Icon" />
                        Cart{" "}
                        <span className={styles.cartCount}>
                            {" "}
                            {items.reduce(
                                (acc, item) => (acc += item.count),
                                0
                            )}
                        </span>
                    </NavLink>
                </div>
                <Button
                    className={styles.exit}
                    data-testid="exit-button"
                    onClick={logout}
                >
                    <img src="/exit-icon.svg" alt="Exit Button" />
                    Log out
                </Button>
            </div>
            <div data-testid="outlet-container" className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
