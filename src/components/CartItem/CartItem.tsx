import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";
import styles from "./CartItem.module.css";

function CartItem(props: CartItemProps) {
	console.log(props, "here")
    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartActions.add(props.id));
    };

    const decrease = () => {};

    const remove = () => {};

    return (
        <div className={styles.item}>
            <div
                className={styles.image}
                style={{ backgroundImage: `url('${props.image}')` }}
            ></div>
            <div className={styles.description}>
                <div className={styles.name}>{props.title}</div>
                <div className={styles.price}>{props.price}&nbsp;$</div>
            </div>
            <div className={styles.actions}>
                <button className={styles.minus} onClick={decrease}>
                    <img src="/minus-icon.svg" alt="Delete Item" />
                </button>
                <div className={styles.number}>{props.count}</div>
                <button className={styles.plus} onClick={increase}>
                    <img src="/plus-icon.svg" alt="Add to cart" />
                </button>
                <button className={styles.remove} onClick={remove}>
                    <img src="/delete-icon.svg" alt="Delete all" />
                </button>
            </div>
        </div>
    );
}

export default CartItem;
