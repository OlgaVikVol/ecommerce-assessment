import { ChangeEvent, useEffect, useState } from "react";
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
    const [filter, setFilter] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const lowerCaseFilter = filter.toLowerCase();
        const filtered = products.filter(
            (product) =>
                product.title.toLowerCase().includes(lowerCaseFilter) ||
                product.description.toLowerCase().includes(lowerCaseFilter)
        );

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [filter, products]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

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

    const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div className={styles.head}>
                <Headling>Menu</Headling>
                <Search
                    placeholder="Enter the dish or ingredients"
                    onChange={updateFilter}
                />
            </div>
            <div className={styles.products}>
                {currentProducts.length > 0 &&
                    currentProducts.map((product) => (
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
                {currentProducts.length === 0 && <p>No products found.</p>}
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
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </Button>
            </div>
        </>
    );
}

export default Menu;
