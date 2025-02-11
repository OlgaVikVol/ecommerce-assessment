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
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState<"price" | "rating" | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    const categories = ["All", ...new Set(products.map((p) => p.category))];

    useEffect(() => {
        const lowerCaseFilter = filter.toLowerCase();
        let filtered = products.filter(
            (product) =>
                (selectedCategory === "All" ||
                    product.category === selectedCategory) &&
                (product.title.toLowerCase().includes(lowerCaseFilter) ||
                    product.description.toLowerCase().includes(lowerCaseFilter))
        );

        if (sortBy) {
            filtered = [...filtered].sort((a, b) => {
                if (sortOrder === "asc") {
                    return a[sortBy] - b[sortBy];
                } else {
                    return b[sortBy] - a[sortBy];
                }
            });
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [filter, products, selectedCategory, sortBy, sortOrder]);

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

    const toggleSort = (criteria: "price" | "rating") => {
        if (sortBy === criteria) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(criteria);
            setSortOrder("asc");
        }
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

            <div className={styles.tabs}>
                {categories.map((category, index) => (
                    <Button
                        key={index}
                        className={
                            category === selectedCategory
                                ? styles.activeTab
                                : styles.tab
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <div className={styles.sorting}>
                <Button
                    className={
                        sortBy === "price" ? styles.activeSort : styles.sortButton
                    }
                    onClick={() => toggleSort("price")}
                >
                    Sort by Price {sortBy === "price" && (sortOrder === "asc" ? "⬆" : "⬇")}
                </Button>

                <Button
                    className={
                        sortBy === "rating" ? styles.activeSort : styles.sortButton
                    }
                    onClick={() => toggleSort("rating")}
                >
                    Sort by Rating {sortBy === "rating" && (sortOrder === "asc" ? "⬆" : "⬇")}
                </Button>
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
                            category={product.category}
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
