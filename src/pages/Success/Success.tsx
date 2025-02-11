import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./Success.module.css";

function Success() {
    const navigate = useNavigate();

    return (
        <div className={styles.success} data-testid="success-container">
            <img
                src="/pizza.png"
                alt="Pizza image"
                data-testid="success-image"
            />
            <div className={styles.text} data-testid="success-message">
                Your order has been successfully placed!
            </div>
            <Button
                appearance="big"
                onClick={() => navigate("/")}
                data-testid="success-button"
            >
                Make a new order
            </Button>
        </div>
    );
}

export default Success;
