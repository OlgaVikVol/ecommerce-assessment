import { http, HttpResponse } from "msw";
import { getProducts } from "./product-list";

export const handlers = [
    // Handler to fetch all products
    http.get("/api/products", () => {
        return HttpResponse.json(getProducts());
    }),

    // Handler to fetch a specific product by ID
    // http.get("/api/products/:productId", ({ params }) => {
    //     const products = getProducts();
    //     const productId = Number(params.productId); // Ensure `productId` is a number
    //     const product = products.find((p) => p.id === productId);

    //     if (!product) {
    //         return HttpResponse.json("Product not found");
    //     }

    //     return HttpResponse.json(product);
    // }),
];
