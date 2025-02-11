import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className={styles.container} data-testid="error-page">
            <h1 className={styles.title}>Oops! Something went wrong.</h1>
            <p className={styles.message}>
                We couldn't find the page you're looking for.
            </p>
            <Link to="/" className={styles.button} data-testid="error-button">
                Go Back Home
            </Link>
        </div>
    );
}

export default ErrorPage;
