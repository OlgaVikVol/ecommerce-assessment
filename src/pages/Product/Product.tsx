import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductById } from "../../shared/hooks/useFetchProductById";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";

function Product() {
    const { id } = useParams();
    const { product } = useFetchProductById(id ?? "");
    const navigate = useNavigate();

    return (
        <div
            className={styles["product-container"]}
            data-testid="product-container"
        >
            <div
                className={styles["product-header"]}
                data-testid="product-header"
            >
                <img
                    src={product?.image}
                    alt={product?.title}
                    className={styles["product-image"]}
                    data-testid="product-image"
                />
                <div
                    className={styles["product-details"]}
                    data-testid="product-details"
                >
                    <h2
                        className={styles["product-title"]}
                        data-testid="product-title"
                    >
                        {product?.title}
                    </h2>
                    <p
                        className={styles["product-description"]}
                        data-testid="product-description"
                    >
                        {product?.description}
                    </p>
                    <p
                        className={styles["product-price"]}
                        data-testid="product-price"
                    >
                        Price: ${product?.price}
                    </p>
                    <p
                        className={styles["product-rating"]}
                        data-testid="product-rating"
                    >
                        Rating: {product?.rating} ⭐
                    </p>
                    <div
                        className={styles["button-group"]}
                        data-testid="button-group"
                    >
                        <Button data-testid="add-to-cart-button">
                            Add to Cart
                        </Button>
                        <Button
                            className={styles["return-menu-btn"]}
                            data-testid="return-menu-button"
                            onClick={() => navigate("/")}
                        >
                            Back to Menu
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
