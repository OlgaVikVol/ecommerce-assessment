import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
import { truncateText } from "../../shared/helpers/truncateText";

function ProductCard({ ...props }: ProductCardProps) {
    const { id, title, description, price, rating, image } = props;

    return (
        <Link to={`/product/${id}`} className={styles.link}>
            <div className={styles.card} data-testid="product-card">
                <div
                    className={styles.header}
                    style={{ backgroundImage: `url('${image}')` }}
                    data-testid="product-header"
                >
                    <div className={styles.price} data-testid="product-price">
                        {price}&nbsp;
                        <span
                            className={styles.currency}
                            data-testid="product-currency"
                        >
                            $
                        </span>
                    </div>
                    <button
                        className={styles["add-to-cart"]}
                        data-testid="add-to-cart-button"
                    >
                        <img
                            src="/cart-button-icon.svg"
                            alt="Add to cart button"
                            data-testid="cart-button-icon"
                        />
                    </button>
                    <div className={styles.rating} data-testid="product-rating">
                        {rating}&nbsp;
                        <img
                            src="/star-icon.svg"
                            alt="Rating Icon"
                            data-testid="rating-icon"
                        />
                    </div>
                </div>
                <div className={styles.footer} data-testid="product-footer">
                    <div className={styles.title} data-testid="product-title">
                        {title}
                    </div>
                    <div
                        className={styles.description}
                        data-testid="product-description"
                    >
                        {truncateText(description, 28)}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
