import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { Product } from "../../shared/interfaces/product.interface";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);

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
        </>
    );
}

export default Cart;
