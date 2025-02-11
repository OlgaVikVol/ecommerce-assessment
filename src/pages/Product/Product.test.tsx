import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Product from "./Product";
import { cartActions } from "../../store/cart.slice";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const mockDispatch = vi.fn();
vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: () => mockDispatch,
    };
});

describe("Product Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <MemoryRouter initialEntries={["/product/1"]}>
                <Routes>
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </MemoryRouter>
        );

    it("renders product container", () => {
        renderComponent();
        expect(screen.getByTestId("product-container")).toBeInTheDocument();
    });

    it("dispatches add-to-cart action when 'Add to Cart' button is clicked", () => {
        renderComponent();

        const addToCartButton = screen.getByTestId("add-to-cart-button");
        fireEvent.click(addToCartButton);

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(cartActions.add(1)); 
    });

    it("navigates back to menu when 'Back to Menu' button is clicked", () => {
        renderComponent();

        const returnMenuButton = screen.getByTestId("return-menu-button");
        fireEvent.click(returnMenuButton);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});





