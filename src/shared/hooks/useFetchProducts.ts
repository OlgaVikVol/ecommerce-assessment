import { useEffect, useState } from "react";
import { ProductCardProps } from "../../components/ProductCard/ProductCard.props";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                // Make the request to /api/products
                const response = await fetch(`/api/products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    // Assuming the response is a list of products, access `data` directly
                    const data = await response.json();
                    setProducts(data);
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message);
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};
