import { useDispatch, useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Product } from "../../shared/interfaces/product.interface";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../../store/cart.slice";

const DELIVERY_FEE = 10;

function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);
    const token = useSelector((s: RootState) => s.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = items
        .map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
                return 0;
            }
            return i.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const checkout = async () => {
        if (!token) {
            return;
        }

        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ products: items }),
            });

            if (!response.ok) {
                throw new Error("Checkout failed.");
            }

            dispatch(cartActions.clean());
            navigate("/success");
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    useEffect(() => {
        const loadAllItems = async () => {
            const res = await Promise.all(
                items.map(async (i) => {
                    const response = await fetch(`/api/products/${i.id}`);
                    if (!response.ok) return null;
                    return await response.json();
                })
            );

            setCartProducts(res.filter((p) => p !== null) as Product[]); // ✅ Remove nulls
        };

        if (items.length > 0) {
            loadAllItems();
        }
    }, [items]);

    return (
        <>
            <Headling className={styles.headling} data-testid="cart-heading">
                Cart
            </Headling>

            {cartProducts.length === 0 && (
                <p data-testid="cart-empty-message">Cart is empty.</p>
            )}

            {cartProducts.length > 0 &&
                cartProducts.map((product) => {
                    const item = items.find((i) => i.id === product.id);
                    if (!item) return null;

                    return (
                        <CartItem
                            key={product.id}
                            count={item.count}
                            {...product}
                            data-testid={`cart-item-${product.id}`}
                        />
                    );
                })}

            <div className={styles.line} data-testid="cart-total-spent">
                <div className={styles.text}>Total spent:</div>
                <div className={styles.price}>
                    {total}&nbsp;<span>$</span>
                </div>
            </div>

            <hr className={styles.hr} />

            <div className={styles.line} data-testid="cart-delivery-fee">
                <div className={styles.text}>Delivery:</div>
                <div className={styles.price}>
                    {DELIVERY_FEE}&nbsp;<span>$</span>
                </div>
            </div>

            <hr className={styles.hr} />

            <div className={styles.line} data-testid="cart-final-total">
                <div className={styles.text}>
                    Total{" "}
                    <span className={styles["total-count"]}>
                        ({items.length})
                    </span>
                </div>
                <div className={styles.price}>
                    {(Number(total) + DELIVERY_FEE).toFixed(2)}&nbsp;
                    <span>₽</span>
                </div>
            </div>

            <div className={styles.checkout}>
                <Button
                    appearance="big"
                    onClick={checkout}
                    data-testid="checkout-button"
                >
                    Make An Order
                </Button>
            </div>
        </>
    );
}

export default Cart;
