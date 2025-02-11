import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Cart from "./Cart";
import cartReducer from "../../store/cart.slice";
import userReducer from "../../store/user.slice";

describe("Cart Component", () => {
    let store: ReturnType<typeof createTestStore>;

    const createTestStore = () =>
        configureStore({
            reducer: {
                cart: cartReducer,
                user: userReducer,
            },
            preloadedState: {
                cart: {
                    items: [
                        { id: 1, count: 2 },
                        { id: 2, count: 1 },
                    ],
                },
                user: {
                    token: "mocked-token",
                },
            },
        });

    beforeEach(() => {
        store = createTestStore();

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                { id: 1, title: "Product 1", price: 10 },
                { id: 2, title: "Product 2", price: 20 },
            ],
        });
    });

    const renderComponent = () =>
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart />
                </BrowserRouter>
            </Provider>
        );

    it("renders the cart heading", () => {
        renderComponent();
        const heading = screen.getByTestId("cart-heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Cart");
    });

    it("calls checkout function when checkout button is clicked", async () => {
        renderComponent();
        const checkoutButton = screen.getByTestId("checkout-button");
        fireEvent.click(checkoutButton);

        await new Promise((r) => setTimeout(r, 100));

        const state = store.getState();
        expect(state.cart.items).toEqual([]);
    });
});
