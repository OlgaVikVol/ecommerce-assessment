import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

function AuthLayout() {
    return (
        <div className={styles.layout} data-testid="auth-layout">
            <div className={styles.logo} data-testid="auth-logo">
                <img src="/logo.svg" alt="Logo" data-testid="auth-logo-img" />
            </div>
            <div className={styles.content} data-testid="auth-content">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
