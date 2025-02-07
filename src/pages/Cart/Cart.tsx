import { useSelector } from "react-redux";
import Headling from "../../components/Headling/Headling";
import { RootState } from "../../store/store";

function Cart() {
    const items = useSelector((s: RootState) => s.cart.items);

    return (
        <>
            <Headling>Cart</Headling>
        </>
    );
}

export default Cart;
