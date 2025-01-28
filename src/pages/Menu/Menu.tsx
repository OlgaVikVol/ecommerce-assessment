import { useState } from "react";
import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import styles from "./Menu.module.css";
import { useFetchProducts } from "../../shared/hooks/useFetchProducts";
import Button from "../../components/Button/Button";

const ITEMS_PER_PAGE = 6;

function Menu() {
    const { products, loading, error } = useFetchProducts();
    const [currentPage, setCurrentPage] = useState(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Calculate the total number of pages
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    // Get the products for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = products.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Handle page navigation
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <>
            <div className={styles.head}>
                <Headling>Menu</Headling>
                <Search placeholder="Enter the dish or ingredients" />
            </div>
            <div className={styles.products}>
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        rating={product.rating}
                        price={product.price}
                        image={product.image}
                    />
                ))}
            </div>
            <div className={styles.pagination}>
                <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span>
                 &nbsp;Page {currentPage} of {totalPages}&nbsp;
                </span>
                <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default Menu;
