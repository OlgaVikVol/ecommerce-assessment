import { useEffect, useState } from "react";
import { ProductCardProps } from "../../components/ProductCard/ProductCard.props";
import { BASE_URL } from "../consts/api";

export const useFetchProductById = (id: number | string) => {
    const [product, setProduct] = useState<ProductCardProps | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                // Make the request to /api/products/:id
                const response = await fetch(`${BASE_URL}/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
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

        if (id) {
            fetchProduct();
        }
    }, [id]);

    return { product, loading, error };
};
