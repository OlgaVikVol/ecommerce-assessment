import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";
import cn from "classnames";

function Layout() {
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
                        Bob Dealan
                    </div>
                    <div className={styles.email} data-testid="user-email">
                        BobDealan@gmail.com
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
                        Cart
                    </NavLink>
                </div>
                <Button className={styles.exit} data-testid="exit-button">
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
