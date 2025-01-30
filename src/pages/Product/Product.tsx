import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductById } from "../../shared/hooks/useFetchProductById";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button";

function Product() {
    const { id } = useParams();
    const { product } = useFetchProductById(id ?? "");
    const navigate = useNavigate();

    return (
        <div className={styles["product-container"]}>
            <div className={styles["product-header"]}>
                <img
                    src={product?.image}
                    alt={product?.title}
                    className={styles["product-image"]}
                />
                <div className={styles["product-details"]}>
                    <h2 className={styles["product-title"]}>
                        {product?.title}
                    </h2>
                    <p className={styles["product-description"]}>
                        {product?.description}
                    </p>
                    <p className={styles["product-price"]}>
                        Price: ${product?.price}
                    </p>
                    <p className={styles["product-rating"]}>
                        Rating: {product?.rating} ⭐
                    </p>
                    <div className={styles["button-group"]}>
                        <Button>Add to Cart</Button>
                        <Button
                            className={styles["return-menu-btn"]}
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
