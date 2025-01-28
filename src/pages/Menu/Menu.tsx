import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import styles from "./Menu.module.css";

function Menu() {
    return (
        <>
            <div className={styles.head}>
                <Headling>Menu</Headling>
                <Search placeholder="Enter the dish or ingredients" />
            </div>
            <div>
                <ProductCard
                    id={1}
                    title="Pizza"
                    description="Pineapple"
                    rating={4.5}
                    price={12.99}
                    image="/product-demo.png"
                />
            </div>
        </>
    );
}

export default Menu;
