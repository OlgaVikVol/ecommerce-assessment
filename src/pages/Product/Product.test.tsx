import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Product from "./Product";
import * as fetchProductHook from "../../shared/hooks/useFetchProductById";
import { ProductCardProps } from "../../components/ProductCard/ProductCard.props";

// Mock navigate before each test
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate, // Mocking navigation
    };
});

// Define a mock product
const mockProduct: ProductCardProps = {
    id: 1,
    title: "Test Product",
    description: "This is a test product description.",
    price: 99.99,
    rating: 4.5,
    image: "/test-product.jpg",
};

// Spy on `useFetchProductById` and return correct mock data
vi.spyOn(fetchProductHook, "useFetchProductById").mockImplementation((id: number | string) => ({
    product: mockProduct,
    loading: false,
    error: "",
}));

describe("Product Component", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("renders product details correctly", () => {
        render(
            <MemoryRouter initialEntries={["/product/1"]}>
                <Routes>
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId("product-container")).toBeInTheDocument();
        expect(screen.getByTestId("product-title")).toHaveTextContent(mockProduct.title);
        expect(screen.getByTestId("product-description")).toContainHTML("This is a test product descr");
        expect(screen.getByTestId("product-price")).toHaveTextContent(`Price: $${mockProduct.price}`);
        expect(screen.getByTestId("product-rating")).toHaveTextContent(`Rating: ${mockProduct.rating} ⭐`);
    });

    it("renders buttons and triggers navigation", () => {
        render(
            <MemoryRouter initialEntries={["/product/1"]}>
                <Routes>
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </MemoryRouter>
        );

        const returnMenuButton = screen.getByTestId("return-menu-button");
        fireEvent.click(returnMenuButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});



