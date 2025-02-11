import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Product } from "../../shared/interfaces/product.interface";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";
import Button from "../../components/Button/Button";

const DELIVERY_FEE = 10;

function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);

    const total = items
        .map((i) => {
            const product = cartProducts.find((p) => p.id === i.id);
            if (!product) {
                return 0;
            }
            return i.count * product.price;
        })
        .reduce((acc, i) => (acc += i), 0);

    const checkout = () => {};

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
            <Headling className={styles.headling}>Cart</Headling>
            {cartProducts.length === 0 && <p>Cart is empty.</p>}
            {cartProducts.length > 0 &&
                cartProducts.map((product) => {
                    const item = items.find((i) => i.id === product.id);
                    if (!item) return null;

                    return (
                        <CartItem
                            key={product.id}
                            count={item.count}
                            {...product}
                        />
                    );
                })}
            <div className={styles.line}>
                <div className={styles.text}>Total spent:</div>
                <div className={styles.price}>
                    {total}&nbsp;<span>$</span>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.line}>
                <div className={styles.text}>Delivery:</div>
                <div className={styles.price}>
                    {DELIVERY_FEE}&nbsp;<span>$</span>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.line}>
                <div className={styles.text}>
                    Total{" "}
                    <span className={styles["total-count"]}>
                        ({items.length})
                    </span>
                </div>
                <div className={styles.price}>
                    {total + DELIVERY_FEE}&nbsp;<span>₽</span>
                </div>
            </div>
            <div className={styles.checkout}>
                <Button appearance="big" onClick={checkout}>
                    Make An Order
                </Button>
            </div>
        </>
    );
}

export default Cart;
